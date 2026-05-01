with open(r'c:\toolbite\src\pages\tools\ResumeBuilder.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix text color on dark toolbar
content = content.replace(
    '<span className="text-xs font-black text-slate-900">{strength}%</span>',
    '<span className="text-xs font-black text-slate-300">{strength}%</span>'
)

with open(r'c:\toolbite\src\pages\tools\ResumeBuilder.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
