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

def color_mark(prefix):
 # A shared coordinate space keeps the gradient continuous over woven crossings.
 gradient = f'<defs><linearGradient id="{prefix}-color" gradientUnits="userSpaceOnUse" x1="18" y1="16" x2="110" y2="112"><stop stop-color="#7842ed"/><stop offset=".32" stop-color="#4263ed"/><stop offset=".66" stop-color="#db459d"/><stop offset="1" stop-color="#f18b54"/></linearGradient></defs>'
 return gradient + mark(prefix, f'url(#{prefix}-color)')

Path('src/company/public/brand/bigmints-mark-color.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">{color_mark("color-mark")}</svg>')
for suffix, ink in [('color', '#171717'), ('color-white', '#ffffff')]:
 lockup = f'<svg xmlns="http://www.w3.org/2000/svg" width="384" height="88" viewBox="0 0 384 88">{font_style}<g transform="translate(0 5.6) scale(.6)">{color_mark("lockup-" + suffix)}</g><text x="87" y="63.6" font-family="Syne,Arial,sans-serif" font-weight="600" font-size="64" letter-spacing="-1.4" fill="{ink}">Bigmints</text></svg>'
 Path(f'src/company/public/brand/bigmints-logo-{suffix}.svg').write_text(lockup)

color_board = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">{font_style}
<rect width="1200" height="720" fill="#fafafa"/>
<text x="56" y="54" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="#666">BIGMINTS / COLOUR EDITION</text>
<g transform="translate(80 130) scale(2.8)">{color_mark('color-board-main')}</g>
<g transform="translate(628 230) scale(.6)">{color_mark('color-board-word')}</g>
<text x="715" y="288" font-family="Syne,Arial,sans-serif" font-weight="600" font-size="64" letter-spacing="-1.4" fill="#171717">Bigmints</text>
<text x="632" y="342" font-family="Arial,sans-serif" font-size="16" fill="#666">A little more room for possibility.</text>
<rect x="0" y="530" width="1200" height="190" fill="#171717"/>
<g transform="translate(68 584) scale(.55)">{color_mark('color-board-dark')}</g>
<text x="148" y="637" font-family="Syne,Arial,sans-serif" font-weight="600" font-size="58" letter-spacing="-1.3" fill="white">Bigmints</text>
<g transform="translate(630 605) scale(.24)">{color_mark('color-board-small')}</g>
<g transform="translate(706 595) scale(.4)">{color_mark('color-board-medium')}</g>
<g transform="translate(810 580) scale(.64)">{color_mark('color-board-large')}</g>
<text x="1070" y="633" text-anchor="end" font-family="Arial,sans-serif" font-size="12" fill="#aaa">One woven form.</text>
</svg>'''
Path('src/company/public/brand/bigmints-identity-color.svg').write_text(color_board)

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
<text x="942" y="572" font-family="Arial" font-size="20" fill="#171717">Bigmints FZE</text>
</svg>'''
Path('src/company/public/brand/social-preview.svg').write_text(social)

# Social profiles use the same approved mark and wordmark as the website.
avatar = f'''<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<rect width="400" height="400" fill="white"/>
<g transform="translate(72 72) scale(2)">{mark('profile-avatar','#171717')}</g>
</svg>'''
Path('src/company/public/brand/profile-avatar.svg').write_text(avatar)
# Use the website hero palette and Instrument Serif without small supporting copy.
serif_faces = "".join(
    '@font-face{font-family:Instrument Serif;font-style:' + style +
    ';font-weight:400;src:url("data:font/ttf;base64,' +
    base64.b64encode(Path('src/company/public/fonts/instrument-serif-' + filename + '.ttf').read_bytes()).decode() +
    '") format("truetype");}'
    for style, filename in [('normal', 'regular'), ('italic', 'italic')]
)
cover = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
<defs>
<style>{serif_faces}</style>
<linearGradient id="cover-paper" x1="0" y1="0" x2="1" y2=".4">
  <stop stop-color="#f4eaff"/><stop offset=".52" stop-color="#fff2ed"/><stop offset="1" stop-color="#e6efff"/>
</linearGradient>
<linearGradient id="cover-violet" x1="0" y1="0" x2="1" y2="1">
  <stop stop-color="#9276ff"/><stop offset=".55" stop-color="#d18ee9"/><stop offset="1" stop-color="#ff9c80"/>
</linearGradient>
<linearGradient id="cover-blue" x1="0" y1="0" x2="1" y2="1">
  <stop stop-color="#527af5"/><stop offset=".55" stop-color="#8fc6ff"/><stop offset="1" stop-color="#a27bf5"/>
</linearGradient>
<radialGradient id="cover-light" cx=".53" cy=".3" r=".65">
  <stop stop-color="#fff" stop-opacity=".98"/><stop offset=".47" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
</radialGradient>
<filter id="cover-soft" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="24"/></filter>
<clipPath id="cover-crop"><rect width="1128" height="191"/></clipPath>
</defs>
<g clip-path="url(#cover-crop)">
<rect width="1128" height="191" fill="url(#cover-paper)"/>
<g filter="url(#cover-soft)">
  <ellipse cx="55" cy="65" rx="260" ry="180" transform="rotate(-28 55 65)" fill="url(#cover-violet)"/>
  <ellipse cx="1175" cy="48" rx="265" ry="210" transform="rotate(24 1175 48)" fill="url(#cover-blue)"/>
  <ellipse cx="660" cy="278" rx="480" ry="130" fill="#ffb48b" opacity=".8"/>
</g>
<rect width="1128" height="191" fill="url(#cover-light)"/>
<text x="352" y="83" font-family="Instrument Serif,Georgia,serif" font-size="65" fill="#171717">Make work easier.</text>
<text x="352" y="149" font-family="Instrument Serif,Georgia,serif" font-size="65" font-style="italic" fill="#171717">Make room for life.</text>
</g>
</svg>'''
Path('src/company/public/brand/profile-cover.svg').write_text(cover)
