with open(r'c:\toolbite\src\pages\tools\ResumeBuilder.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Check actual elegant end
idx = content.find("'Global Business Review' }]")
print("Elegant end idx:", idx)
if idx > 0:
    print(repr(content[idx:idx+100]))
