import re
import os

workspace_dir = r"C:\Users\Utente\Documents\antigravity\charming-planck"
html_path = os.path.join(workspace_dir, "index.html")
css_path = os.path.join(workspace_dir, "style.css")
js_path = os.path.join(workspace_dir, "script.js")
out_path = os.path.join(workspace_dir, "aufinity_oktoberfest_single.html")

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Replace css link with inline style block
html = re.sub(r'<link\s+rel="stylesheet"\s+href="style\.css"\s*>', f'<style>\n{css}\n</style>', html)

# Replace js script with inline script block
html = re.sub(r'<script\s+src="script\.js"\s*></script>', f'<script>\n{js}\n</script>', html)

# Replace local assets paths with GitHub raw URLs
github_assets_url = "https://raw.githubusercontent.com/antonionocellanb4/aufinity-oktoberfest/main/assets/"
html = html.replace('assets/', github_assets_url)

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated combined HTML at", out_path)
