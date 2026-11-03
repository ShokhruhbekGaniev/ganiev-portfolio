"""Build the editable resume and print view from cv.json. Requires python-docx."""
import argparse
import html
import json
from pathlib import Path

from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parent.parent
data = json.loads((ROOT / 'scripts/cv.json').read_text())
parser = argparse.ArgumentParser()
parser.add_argument('--out-dir', type=Path, required=True)
args = parser.parse_args()
args.out_dir.mkdir(parents=True, exist_ok=True)

doc = Document()
section = doc.sections[0]
section.page_width, section.page_height = Inches(8.5), Inches(11)
section.top_margin = section.bottom_margin = Inches(0.48)
section.left_margin = section.right_margin = Inches(0.62)
normal = doc.styles['Normal']
normal.font.name = 'Carlito'
normal.font.size = Pt(11)
normal.font.color.rgb = RGBColor.from_string('20272C')
normal.paragraph_format.space_after = Pt(4)
normal.paragraph_format.line_spacing = 1.04
for name in ('Title', 'Subtitle', 'Heading 1', 'Heading 2', 'List Bullet'):
    doc.styles[name].font.name = 'Carlito'
title = doc.styles['Title']
title.font.size = Pt(25)
title.font.bold = True
title.font.color.rgb = RGBColor(0, 0, 0)
title.paragraph_format.space_after = Pt(1)
for border in title.element.xpath('./w:pPr/w:pBdr'):
    border.getparent().remove(border)
sub = doc.styles['Subtitle']
sub.font.size = Pt(14)
sub.font.bold = True
sub.font.italic = False
sub.font.color.rgb = RGBColor.from_string('315B45')
sub.paragraph_format.space_after = Pt(5)
head = doc.styles['Heading 1']
head.font.size = Pt(10.5)
head.font.bold = True
head.font.color.rgb = RGBColor.from_string('315B45')
head.paragraph_format.space_before = Pt(10)
head.paragraph_format.space_after = Pt(4)
head.paragraph_format.keep_with_next = True
bullet_style = doc.styles['List Bullet']
bullet_style.paragraph_format.left_indent = Inches(0.13)
bullet_style.paragraph_format.first_line_indent = Inches(-0.13)
bullet_style.paragraph_format.space_after = Pt(3.5)
bullet_style.paragraph_format.line_spacing = 1.03
doc.core_properties.title = f"{data['name']} - {data['title']}"
doc.core_properties.author = data['name']
doc.core_properties.subject = 'Resume'
doc.core_properties.keywords = 'Go, TypeScript, Vue, AI engineering, MCP'
doc.core_properties.comments = ''

def link(p, text, url):
    rel = p.part.relate_to(url, 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink', is_external=True)
    node = OxmlElement('w:hyperlink')
    node.set(qn('r:id'), rel)
    r = OxmlElement('w:r')
    props = OxmlElement('w:rPr')
    color = OxmlElement('w:color'); color.set(qn('w:val'), '315B45'); props.append(color)
    r.append(props)
    t = OxmlElement('w:t'); t.text = text; r.append(t)
    node.append(r); p._p.append(node)

def heading(text):
    return doc.add_paragraph(text, 'Heading 1')

def role_line(left, period):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    p.add_run(left).bold = True
    p.add_run('  |  ' + period)
    return p

def bullets(lines):
    for text in lines:
        p = doc.add_paragraph(text, 'List Bullet')
        p.paragraph_format.keep_together = True

doc.add_paragraph(data['name'], 'Title')
doc.add_paragraph(data['title'], 'Subtitle')
p = doc.add_paragraph()
p.paragraph_format.space_after = Pt(2)
p.add_run(data['location'] + '  |  ')
link(p, data['email'], 'mailto:' + data['email'])
p = doc.add_paragraph()
p.paragraph_format.space_after = Pt(7)
for i, (label, url) in enumerate(data['links']):
    if i: p.add_run('  /  ')
    link(p, label, url)
doc.add_paragraph(data['summary'])

heading('SELECTED AI PRODUCT')
prod = data['product']
role_line(prod['name'] + ' - ' + prod['role'], prod['period'])
p = doc.add_paragraph()
p.paragraph_format.space_after = Pt(4)
link(p, 'hamyonimda.uz', prod['url'])
p.add_run('  |  ' + prod['description'])
bullets(prod['bullets'])

heading('PROFESSIONAL EXPERIENCE')
exp = data['experience']
role_line(exp['company'] + ' - ' + exp['role'], exp['period'])
bullets(exp['bullets'])

heading('TECHNICAL SKILLS')
for label, value in data['skills']:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(2)
    p.add_run(label + ': ').bold = True
    p.add_run(value)

heading('EDUCATION AND LANGUAGES')
p = doc.add_paragraph(data['education'])
p.paragraph_format.space_after = Pt(2)
doc.add_paragraph(data['languages'])
doc.save(args.out_dir / 'Shokhrukhbek_Ganiev_CV.docx')

esc = html.escape
def ul(items): return '<ul>' + ''.join('<li>' + esc(x) + '</li>' for x in items) + '</ul>'
contacts = ' · '.join(f'<a href="{esc(url)}">{esc(label)}</a>' for label, url in data['links'])
page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(data['name'])} - {esc(data['title'])}</title>
<style>@page{{size:Letter;margin:0.48in 0.62in}}*{{box-sizing:border-box}}body{{max-width:7.26in;margin:32px auto;color:#20272c;font:11pt/1.04 Carlito,Calibri,sans-serif}}h1{{font-size:25pt;color:#000;margin:0 0 3px}}.role{{font-size:14pt;color:#315b45;font-weight:bold;margin:0 0 7px}}a{{color:#315b45;text-decoration:none}}p{{margin:4px 0 6px}}h2{{font-size:10.5pt;color:#315b45;margin:13px 0 5px}}h3{{font-size:11pt;margin:4px 0}}ul{{padding-left:14px;margin:4px 0}}li{{margin:0 0 5px;break-inside:avoid}}@media print{{body{{margin:0}}}}</style></head><body>
<h1>{esc(data['name'])}</h1><p class="role">{esc(data['title'])}</p>
<p>{esc(data['location'])} · <a href="mailto:{esc(data['email'])}">{esc(data['email'])}</a></p><p>{contacts}</p>
<p>{esc(data['summary'])}</p>
<h2>SELECTED AI PRODUCT</h2><h3>{esc(prod['name'])} - {esc(prod['role'])} · {esc(prod['period'])}</h3>
<p><a href="{esc(prod['url'])}">hamyonimda.uz</a> · {esc(prod['description'])}</p>{ul(prod['bullets'])}
<h2>PROFESSIONAL EXPERIENCE</h2><h3>{esc(exp['company'])} - {esc(exp['role'])} · {esc(exp['period'])}</h3>{ul(exp['bullets'])}
<h2>TECHNICAL SKILLS</h2>{''.join('<p><strong>'+esc(k)+': </strong>'+esc(v)+'</p>' for k,v in data['skills'])}
<h2>EDUCATION AND LANGUAGES</h2><p>{esc(data['education'])}</p><p>{esc(data['languages'])}</p></body></html>'''
(ROOT / 'scripts/cv-print.html').write_text(page)
print(args.out_dir / 'Shokhrukhbek_Ganiev_CV.docx')
