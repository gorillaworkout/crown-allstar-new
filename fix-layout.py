from pathlib import Path
import re

p = Path('/home/ubuntu/apps/crown-allstar-new/app/layout.tsx')
text = p.read_text()

# Extract script tags that are wrongly placed outside <body> or <head>
scripts_to_move = """      <script async src="https://www.googletagmanager.com/gtag/js?id=G-6DWD5JTFEL"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6DWD5JTFEL');
        `,
      }} />"""

if scripts_to_move in text:
    text = text.replace(scripts_to_move, "")
    
    # Place them inside <head> before </head>
    text = text.replace("      </head>", f"{scripts_to_move}\n      </head>")
    
    p.write_text(text)
    print("Fixed layout.tsx hydration error in crown-allstar-new")
else:
    print("Could not find the scripts to move")
