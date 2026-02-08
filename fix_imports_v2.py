import os
import re

def fix_imports(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    original_content = content

    # 1. Replace named imports: import { A, B } from 'mod'
    # Supports multiline
    def replace_named(match):
        imports_block = match.group(1)
        module = match.group(2)
        # Clean up imports: remove newlines, extra spaces
        imports_clean = re.sub(r'\s+', ' ', imports_block).strip()
        # Handle 'as': A as B -> A: B
        imports_fixed = re.sub(r'\s+as\s+', ': ', imports_clean)
        return f'const {{ {imports_fixed} }} = require("{module}");'

    content = re.sub(
        r'^\s*import\s+\{([^}]+)\}\s+from\s+[\'"]([^\'"]+)[\'"];?',
        replace_named,
        content,
        flags=re.MULTILINE | re.DOTALL
    )

    # 2. Replace default imports: import A from 'mod'
    def replace_default(match):
        var_name = match.group(1)
        module = match.group(2)
        return f'const {var_name} = require("{module}").default || require("{module}");'

    content = re.sub(
        r'^\s*import\s+(\w+)\s+from\s+[\'"]([^\'"]+)[\'"];?',
        replace_default,
        content,
        flags=re.MULTILINE
    )

    # 3. Replace mixed imports: import A, { B } from 'mod'
    # This is harder. Let's do it if needed.
    # regex: import\s+(\w+)\s*,\s*\{([^}]+)\}\s+from...
    def replace_mixed(match):
        default_var = match.group(1)
        named_vars = match.group(2)
        module = match.group(3)
        
        named_clean = re.sub(r'\s+', ' ', named_vars).strip()
        named_fixed = re.sub(r'\s+as\s+', ': ', named_clean)
        
        return f'const {default_var} = require("{module}").default || require("{module}");\nconst {{ {named_fixed} }} = require("{module}");'

    content = re.sub(
        r'^\s*import\s+(\w+)\s*,\s*\{([^}]+)\}\s+from\s+[\'"]([^\'"]+)[\'"];?',
        replace_mixed,
        content,
        flags=re.MULTILINE | re.DOTALL
    )
    
    # 4. Replace side-effect imports: import 'mod'
    content = re.sub(
        r'^\s*import\s+[\'"]([^\'"]+)[\'"];?',
        r'require("\1");',
        content,
        flags=re.MULTILINE
    )

    if content != original_content:
        print(f"Fixing {file_path}")
        with open(file_path, 'w') as f:
            f.write(content)

# Find all .md files
start_dir = "."
for root, dirs, files in os.walk(start_dir):
    if 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.md'):
            fix_imports(os.path.join(root, file))
