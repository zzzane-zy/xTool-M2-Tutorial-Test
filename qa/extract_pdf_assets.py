from __future__ import annotations

import json
from pathlib import Path

import fitz
from PIL import Image, ImageChops, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "images" / "pdf-originals"
PDFS = {
    "m2": Path(r"C:\Users\mk13802\Downloads\ZH_xTool_M2_产品说明书.pdf"),
    "ink": Path(r"C:\Users\mk13802\Downloads\260825_JS002.1 用户手册_更新V2.2.pdf"),
    "ra3": Path(r"C:\Users\mk13802\Downloads\JS002_RA3lite_操作指引_线上版_ZH.pdf"),
}

# Pages containing the operational illustrations used by the online guides.
PAGE_RANGES = {
    "m2": range(3, 22),
    "ink": range(3, 15),
    "ra3": range(3, 20),
}


def crop_to_content(image: Image.Image, margin: int = 36) -> Image.Image:
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, "white")
    diff = ImageChops.difference(rgb, background)
    diff = ImageEnhance.Contrast(diff).enhance(3.0)
    bbox = diff.convert("L").point(lambda value: 0 if value < 10 else 255).getbbox()
    if not bbox:
        return rgb
    left = max(0, bbox[0] - margin)
    top = max(0, bbox[1] - margin)
    right = min(rgb.width, bbox[2] + margin)
    bottom = min(rgb.height, bbox[3] + margin)
    return rgb.crop((left, top, right, bottom))


def extract_embedded(doc: fitz.Document, key: str) -> list[dict]:
    embedded_dir = OUT / key / "embedded"
    embedded_dir.mkdir(parents=True, exist_ok=True)
    manifest: dict[int, dict] = {}
    for page_index, page in enumerate(doc):
        for image in page.get_images(full=True):
            xref = image[0]
            record = manifest.setdefault(
                xref,
                {
                    "xref": xref,
                    "pages": [],
                    "width": None,
                    "height": None,
                    "ext": None,
                    "bytes": None,
                    "file": None,
                },
            )
            page_number = page_index + 1
            if page_number not in record["pages"]:
                record["pages"].append(page_number)
            if record["file"] is None:
                extracted = doc.extract_image(xref)
                ext = extracted["ext"]
                filename = f"{key}-xref-{xref:05d}.{ext}"
                (embedded_dir / filename).write_bytes(extracted["image"])
                record.update(
                    {
                        "width": extracted["width"],
                        "height": extracted["height"],
                        "ext": ext,
                        "bytes": len(extracted["image"]),
                        "file": f"embedded/{filename}",
                    }
                )
    return list(manifest.values())


def render_pages(doc: fitz.Document, key: str) -> list[str]:
    page_dir = OUT / key / "pages"
    page_dir.mkdir(parents=True, exist_ok=True)
    files: list[str] = []
    for page_number in PAGE_RANGES[key]:
        page = doc[page_number - 1]
        pixmap = page.get_pixmap(dpi=300, alpha=False, colorspace=fitz.csRGB)
        image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        filename = f"{key}-page-{page_number:02d}.png"
        image.save(page_dir / filename, format="PNG", optimize=True)
        crop_filename = f"{key}-page-{page_number:02d}-content.png"
        crop_to_content(image).save(page_dir / crop_filename, format="PNG", optimize=True)
        files.append(f"pages/{crop_filename}")
    return files


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    summary = {}
    for key, pdf_path in PDFS.items():
        doc = fitz.open(pdf_path)
        embedded = extract_embedded(doc, key)
        pages = render_pages(doc, key)
        manifest_path = OUT / key / "manifest.json"
        manifest_path.write_text(
            json.dumps(
                {
                    "source_pdf": str(pdf_path),
                    "pages_rendered": list(PAGE_RANGES[key]),
                    "embedded_images": embedded,
                    "page_content_files": pages,
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )
        summary[key] = {
            "embedded_unique": len(embedded),
            "rendered_pages": len(pages),
        }
        print(f"{key}: {len(embedded)} embedded images, {len(pages)} rendered pages", flush=True)
    (OUT / "manifest.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
