"""Regenerate the selected woven Bigmints vector identity. Run from the repository root."""
from pathlib import Path
import base64
font_data = base64.b64encode(Path("src/company/public/fonts/syne-600.ttf").read_bytes()).decode()
font_style = '<style>@font-face{font-family:Syne;font-style:normal;font-weight:600;src:url("data:font/ttf;base64,' + font_data + '") format("truetype");}</style>'
# Preserve the exact woven geometry from the identity reference selected by the owner.
woven_svg = Path("design/previous-identity/woven-mark.svg").read_text()
woven_content = woven_svg.split(">", 1)[1].rsplit("</svg>", 1)[0]
# Slightly stronger strokes, with the crossing gaps preserved for small display sizes.
woven_content = woven_content.replace('stroke-width="10.5"', 'stroke-width="11.5"').replace('stroke-width="17"', 'stroke-width="18"')

def mark(prefix, ink):
 return woven_content.replace("bigmints-mark", prefix).replace("#171717", ink)

for name,ink in [('bigmints-mark','#171717'),('bigmints-mark-white','#ffffff')]:
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">{mark(name,ink)}</svg>'
 Path(f'src/company/public/brand/{name}.svg').write_text(svg)
Path('src/company/public/favicon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#171717"/><g transform="translate(7 7) scale(.89)">{mark("icon","white")}</g></svg>')
board=f'''<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 920">{font_style}<rect width="1440" height="920" fill="#f8f8f8"/>
<text x="64" y="65" font-family="Arial,sans-serif" font-size="13" letter-spacing="2" fill="#777">BIGMINTS / A CONNECTED WHOLE</text>
<text x="1376" y="65" text-anchor="end" font-family="Arial,sans-serif" font-size="13" fill="#777">SELECTED IDENTITY / WOVEN</text>
<line x1="64" y1="94" x2="1376" y2="94" stroke="#ddd"/>
<g transform="translate(100 174) scale(3.7)">{mark('board-main','#171717')}</g>
<g transform="translate(730 230) scale(.6)">{mark('board-word','#171717')}</g>
<text x="817" y="288" font-family="Syne,Arial,sans-serif" font-weight="600" font-size="64" letter-spacing="-1.4" fill="#171717">Bigmints</text>
<text x="736" y="382" font-family="Georgia,serif" font-size="35" fill="#171717">Make work easier.</text><text x="736" y="427" font-family="Georgia,serif" font-size="35" fill="#777">Make room for life.</text>
<text x="736" y="506" font-family="Arial,sans-serif" font-size="15" fill="#666">An open frame. A little more room for possibility.</text>
<line x1="64" y1="710" x2="1376" y2="710" stroke="#ddd"/>
<text x="64" y="755" font-family="Arial,sans-serif" font-size="11" letter-spacing="1.5" fill="#777">MONOCHROME / BUILT TO SCALE</text>
<g transform="translate(64 788) scale(.24)">{mark('s1','#171717')}</g>
<g transform="translate(125 780) scale(.38)">{mark('s2','#171717')}</g>
<g transform="translate(207 770) scale(.55)">{mark('s3','#171717')}</g>
<rect x="350" y="747" width="115" height="115" rx="23" fill="#171717"/><g transform="translate(360 757) scale(.74)">{mark('reverse','white')}</g>
<text x="736" y="778" font-family="Arial,sans-serif" font-size="11" letter-spacing="1.5" fill="#777">REPEATED AS A PATTERN</text>
'''
for j in range(2):
 for i in range(9): board+=f'<g opacity="{.25 if (i+j)%2 else .55}" transform="translate({736+i*66} {790+j*47}) scale(.36)">{mark(f"p{i}-{j}",'#171717')}</g>'
board+='</svg>'
Path('src/company/public/brand/bigmints-identity.svg').write_text(board)

# Editable social card source; rasterise at 1200 × 630 for social platforms.
social = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">{font_style}
<rect width="1200" height="630" fill="white"/>
<g transform="translate(60 44) scale(.28125)">{mark('social','#171717')}</g>
<text x="108" y="74" font-family="Syne,Arial,sans-serif" font-weight="600" font-size="30" fill="#171717">Bigmints</text>
<text x="60" y="264" font-family="Georgia" font-size="67" fill="#171717">Make work easier.</text>
<text x="60" y="357" font-family="Georgia" font-size="67" fill="#777777">Make room for life.</text>
<rect x="805" y="125" width="331" height="338" fill="#171717"/>
<text x="832" y="167" font-family="Arial" font-size="15" fill="white">SAVEADAY</text>
<text x="832" y="258" font-family="Georgia" font-size="36" fill="white">More time for</text>
<text x="832" y="303" font-family="Georgia" font-size="36" fill="white">your business.</text>
<path d="M832 365H1106" stroke="#555555"/>
<text x="832" y="408" font-family="Arial" font-size="16" fill="#cccccc">Less busywork. More business.</text>
<path d="M60 524H1136" stroke="#dddddd"/>
<text x="60" y="572" font-family="Arial" font-size="20" fill="#171717">A technology product company.</text>
<text x="942" y="572" font-family="Arial" font-size="20" fill="#171717">Bigmints FZE LLC</text>
</svg>'''
Path('src/company/public/brand/social-preview.svg').write_text(social)
