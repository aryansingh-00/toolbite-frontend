import os

src_file = r'c:\toolbite\src\pages\tools\ResumeBuilder.jsx'
with open(src_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if 'const renderTemplatesStep = () => {' in line:
        start_idx = i
    if 'const renderGitHubGraph = () => (' in line:
        end_idx = i

if start_idx != -1 and end_idx != -1:
    with open(r'c:\toolbite\scratch\gallery.jsx', 'r', encoding='utf-8') as f:
        gallery_jsx = f.read()
    
    new_lines = lines[:start_idx] + [gallery_jsx + '\n'] + lines[end_idx:]
    with open(src_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully patched ResumeBuilder.jsx (Gallery)")
else:
    print("Failed to find boundaries", start_idx, end_idx)
