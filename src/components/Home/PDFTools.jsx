import React from "react";

function PDFTools() {
  return (
    <div class="tools"
    id="pdf-tools">
      <div class="tools__container "
      >
        <div
          class="tools__item "
          style={{ minHeight: "300px", minWidth: "450px" }}
        >
          <a href="/MergePDF" title="Merge PDF">
                <div class="tools__item__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50"><g fill="rgb(93.333333%,42.352941%,30.196078%)" fill-rule="evenodd"><path d="M5.488.363h21.75c1.78 0 2.43.184 3.082.535a3.66 3.66 0 0 1 1.512 1.512c.348.652.535 1.297.535 3.082v21.746c0 1.78-.187 2.43-.535 3.082a3.66 3.66 0 0 1-1.512 1.512c-.652.348-1.3.535-3.082.535H5.488c-1.78 0-2.43-.187-3.082-.535A3.66 3.66 0 0 1 .895 30.32c-.348-.652-.535-1.3-.535-3.082V5.488c0-1.78.188-2.43.535-3.082A3.71 3.71 0 0 1 2.406.895c.652-.348 1.3-.53 3.082-.53zm0 0"></path><path d="M44.563 49.69H22.816c-1.78 0-2.43-.184-3.082-.535-.645-.34-1.172-.867-1.512-1.512-.348-.652-.535-1.297-.535-3.082V22.816c0-1.78.184-2.43.535-3.082.34-.645.867-1.172 1.512-1.512.652-.348 1.3-.535 3.082-.535h21.746c1.785 0 2.43.188 3.082.535.645.34 1.172.867 1.512 1.512.352.652.535 1.3.535 3.082v21.746c0 1.785-.184 2.43-.535 3.082-.34.645-.867 1.172-1.512 1.512-.652.352-1.297.535-3.082.535zm0 0"></path></g><path d="M17.906 10.965c-.484 0-.875.387-.875.86v3.8L9.84 8.523c-.344-.336-.895-.336-1.238 0-.164.16-.254.38-.254.605a.86.86 0 0 0 .254.6l7.195 7.098h-3.875c-.484 0-.875.387-.875.86s.4.86.875.86h5.984a.88.88 0 0 0 .332-.066.86.86 0 0 0 .473-.465.79.79 0 0 0 .066-.328v-5.87c.004-.473-.387-.86-.87-.86zm14.418 28.008c.48 0 .87-.383.87-.86v-3.797l7.195 7.098a.88.88 0 0 0 1.234 0 .85.85 0 0 0 .258-.605c0-.23-.094-.45-.258-.605l-7.2-7.102h3.875c.484 0 .875-.383.875-.86s-.4-.855-.875-.855h-5.984a.92.92 0 0 0-.336.066c-.2.086-.383.25-.473.46a.88.88 0 0 0-.066.328v5.87c0 .477.4.86.875.86zm-10.1-10.1c-.355.352-.93.352-1.285 0s-.355-.934 0-1.3a.91.91 0 0 1 1.285 0c.355.352.355.934 0 1.3zm3.374-3.357a.91.91 0 0 1-1.285 0 .91.91 0 0 1 0-1.285c.352-.352.93-.352 1.285 0a.91.91 0 0 1 0 1.285zm3.36-3.364a.91.91 0 0 1-1.285 0 .91.91 0 0 1 0-1.285.91.91 0 0 1 1.285 0 .91.91 0 0 1 0 1.285zm0 0" fill="rgb(100%,100%,100%)"></path></svg>
                </div>
                <h3>Merge PDF</h3>
                <div class="tools__item__content">
                    <p>Combine PDFs in the order you want with the easiest PDF merger available.</p>
                </div>
            </a>
        </div>
        <div
          class="tools__item"
          style={{ minHeight: "300px", minWidth: "450px" }}
        >
         <a href="/SplitPDF" title="Split PDF">
                <div class="tools__item__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50"><g fill="rgb(93.333333%,42.352941%,30.196078%)" fill-rule="evenodd"><path d="M5.488.363h21.75c1.78 0 2.43.184 3.082.535a3.66 3.66 0 0 1 1.512 1.512c.348.652.535 1.297.535 3.082v21.746c0 1.78-.187 2.43-.535 3.082a3.66 3.66 0 0 1-1.512 1.512c-.652.348-1.3.535-3.082.535H5.488c-1.78 0-2.43-.187-3.082-.535A3.66 3.66 0 0 1 .895 30.32c-.348-.652-.535-1.3-.535-3.082V5.488c0-1.78.188-2.43.535-3.082A3.71 3.71 0 0 1 2.406.895c.652-.348 1.3-.53 3.082-.53zm0 0"></path><path d="M44.563 49.69H22.816c-1.78 0-2.43-.184-3.082-.535-.645-.34-1.172-.867-1.512-1.512-.348-.652-.535-1.297-.535-3.082V22.816c0-1.78.184-2.43.535-3.082.34-.645.867-1.172 1.512-1.512.652-.348 1.3-.535 3.082-.535h21.746c1.785 0 2.43.188 3.082.535.645.34 1.172.867 1.512 1.512.352.652.535 1.3.535 3.082v21.746c0 1.785-.184 2.43-.535 3.082-.34.645-.867 1.172-1.512 1.512-.652.352-1.297.535-3.082.535zm0 0"></path></g><path d="M9.22 15.87c.484 0 .875-.387.875-.86v-3.8l7.195 7.102a.88.88 0 0 0 1.234 0 .85.85 0 0 0 0-1.215L11.328 10h3.875c.484 0 .875-.387.875-.86s-.4-.86-.875-.86H9.22a.88.88 0 0 0-.332.066.86.86 0 0 0-.539.793v5.875c0 .473.4.86.87.86zm31.793 18.2c-.484 0-.875.383-.875.855v3.8L32.94 31.63a.88.88 0 0 0-1.234 0c-.164.156-.258.375-.258.605a.85.85 0 0 0 .258.605l7.2 7.1H35.02c-.48 0-.87.387-.87.86a.86.86 0 0 0 .871.855H41a.88.88 0 0 0 .805-.527.86.86 0 0 0 .066-.328v-5.883a.87.87 0 0 0-.87-.855zm-18.78-5.187c-.355.352-.93.352-1.285 0s-.355-.934 0-1.3a.91.91 0 0 1 1.285 0c.355.352.355.934 0 1.3zm3.365-3.367a.91.91 0 0 1-1.285 0 .91.91 0 0 1 0-1.285c.352-.352.93-.352 1.285 0a.91.91 0 0 1 0 1.285zm3.36-3.364a.91.91 0 0 1-1.285 0 .91.91 0 0 1 0-1.285.91.91 0 0 1 1.285 0 .91.91 0 0 1 0 1.285zm0 0" fill="rgb(100%,100%,100%)"></path></svg>
                </div>
                <h3>Split PDF</h3>
                <div class="tools__item__content">
                    <p>Separate one page or a whole set for easy conversion into independent PDF files.</p>
                </div>
            </a>
        </div>
        <div
          class="tools__item"
          style={{ minHeight: "300px", minWidth: "450px" }}
        >
          <a href="/CompressPDF" title="Compress PDF">
                <div class="tools__item__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50"><path d="M31.523 28h14.953c1.223 0 1.668.13 2.117.367.44.234.805.598 1.04 1.04.242.45.367.895.367 2.117v14.953c0 1.223-.13 1.668-.367 2.117-.234.44-.598.805-1.04 1.04-.45.242-.895.367-2.117.367H31.523c-1.223 0-1.668-.13-2.117-.367-.44-.234-.805-.598-1.04-1.04-.242-.45-.367-.895-.367-2.117V31.523c0-1.223.13-1.668.367-2.117.234-.44.598-.805 1.04-1.04.45-.242.895-.367 2.117-.367zm0-28h14.953c1.223 0 1.668.13 2.117.367.44.234.805.598 1.04 1.04.242.45.367.895.367 2.117v14.953c0 1.223-.13 1.668-.367 2.117-.234.44-.598.805-1.04 1.04-.45.242-.895.367-2.117.367H31.523c-1.223 0-1.668-.13-2.117-.367-.44-.234-.805-.598-1.04-1.04-.242-.45-.367-.895-.367-2.117V3.523c0-1.223.13-1.668.367-2.117.234-.44.598-.805 1.04-1.04C29.855.125 30.3 0 31.523 0zm-28 28h14.953c1.223 0 1.668.13 2.117.367.44.234.805.598 1.04 1.04.242.45.367.895.367 2.117v14.953c0 1.223-.13 1.668-.367 2.117-.234.44-.598.805-1.04 1.04-.45.242-.895.367-2.117.367H3.523c-1.223 0-1.668-.13-2.117-.367-.44-.234-.805-.598-1.04-1.04C.125 48.145 0 47.7 0 46.477V31.523c0-1.223.13-1.668.367-2.117.234-.44.598-.805 1.04-1.04.45-.242.895-.367 2.117-.367zm0-28h14.953c1.223 0 1.668.13 2.117.367.44.234.805.598 1.04 1.04.242.45.367.895.367 2.117v14.953c0 1.223-.13 1.668-.367 2.117-.234.44-.598.805-1.04 1.04-.45.242-.895.367-2.117.367H3.523c-1.223 0-1.668-.13-2.117-.367-.44-.234-.805-.598-1.04-1.04C.125 20.145 0 19.7 0 18.477V3.523C0 2.3.13 1.852.367 1.406A2.56 2.56 0 0 1 1.406.367C1.855.13 2.3 0 3.523 0zm0 0" fill-rule="evenodd" fill="rgb(56.078431%,73.72549%,36.470588%)"></path><path d="M35 41.8c0 .48.398.867.883.867a.88.88 0 0 0 .883-.867v-3.844l5.145 5.05a.89.89 0 0 0 1.246 0 .85.85 0 0 0 .262-.613c0-.23-.094-.45-.262-.613l-5.14-5.047h3.914a.88.88 0 0 0 .883-.867c0-.48-.395-.867-.883-.867h-6.05c-.117 0-.23.023-.34.066-.215.086-.387.258-.477.47-.047.102-.066.22-.066.328zm7.3-26.387c.48 0 .867-.398.867-.883a.88.88 0 0 0-.867-.883h-3.844l5.05-5.14a.9.9 0 0 0 0-1.25.86.86 0 0 0-1.227 0l-5.047 5.148V8.492c0-.488-.39-.883-.867-.883a.87.87 0 0 0-.867.879v6.05c0 .113.023.23.066.336.086.215.254.387.47.477.105.047.215.07.332.07H42.3zM8.46 35c-.48 0-.867.398-.867.883s.387.883.867.883h3.844L7.254 41.9c-.34.348-.34.902 0 1.25a.86.86 0 0 0 .613.258c.23 0 .45-.094.613-.258l5.047-5.145v3.914c0 .488.387.883.867.883s.867-.402.867-.883v-6.05c0-.113-.023-.23-.066-.336-.086-.215-.258-.387-.47-.477a.82.82 0 0 0-.332-.07H8.46zm6.074-27.406c-.488 0-.883.387-.883.867v3.844l-5.145-5.05a.9.9 0 0 0-1.25 0A.86.86 0 0 0 7 7.867c0 .23.094.45.258.613l5.145 5.047H8.488c-.488 0-.883.387-.883.867s.402.867.883.867h6.05a.89.89 0 0 0 .336-.066c.215-.1.39-.258.477-.47.05-.102.07-.22.07-.332V8.46c0-.48-.395-.867-.883-.867zm0 0" fill="rgb(100%,100%,100%)"></path></svg>
                </div>
                <h3>Compress PDF</h3>
                <div class="tools__item__content">
                    <p>Reduce file size while optimizing for maximal PDF quality.</p>
                </div>
            </a>
        </div>
        {/*<div*/}
        {/*  class="tools__item"*/}
        {/*  style={{ minHeight: "300px", minWidth: "450px" }}*/}
        {/*>*/}
        {/*  <a href="/WordtoPDF" title="Word to PDF">*/}
        {/*        <div class="tools__item__icon">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50"><path d="M17.676 34.344h9.55c2.477 0 3.375-.258 4.28-.742a5.04 5.04 0 0 0 2.098-2.102c.484-.902.742-1.8.742-4.277v-9.547H44.82c1.8 0 2.453.188 3.113.54s1.176.87 1.527 1.527.54 1.31.54 3.113V44.82c0 1.8-.187 2.453-.54 3.113a3.69 3.69 0 0 1-1.527 1.527c-.66.352-1.312.54-3.113.54H22.855c-1.8 0-2.453-.187-3.113-.54s-1.172-.87-1.527-1.527-.54-1.312-.54-3.113zm0 0" fill-rule="evenodd" fill="rgb(37.254902%,51.372549%,77.647059%)"></path><path d="M43.94 37.137c0-.477-.395-.863-.883-.863s-.883.387-.883.863v3.844l-5.145-5.047c-.348-.34-.902-.34-1.25 0a.85.85 0 0 0-.258.609.86.86 0 0 0 .258.613l5.145 5.05h-3.914c-.488 0-.883.387-.883.867s.395.867.883.867h6.05c.113-.004.227-.023.336-.07a.87.87 0 0 0 .477-.465c.05-.105.066-.22.066-.332l.004-5.934zm0 0" fill="rgb(100%,100%,100%)"></path><path d="M27.145 32.324H5.18c-1.8 0-2.453-.187-3.113-.543S.89 30.914.54 30.254 0 28.95 0 27.145V5.18c0-1.8.188-2.453.54-3.113A3.69 3.69 0 0 1 2.066.539C2.727.188 3.38 0 5.18 0h21.965c1.8 0 2.453.188 3.113.54s1.172.87 1.527 1.527.54 1.313.54 3.113v21.965c0 1.8-.187 2.453-.54 3.113s-.87 1.176-1.527 1.527-1.312.54-3.113.54zm0 0" fill-rule="evenodd" fill="rgb(86.27451%,89.803922%,98.039216%)"></path><path d="M20.844 8.61h2.96l-2.94 14.64H17.77l-1.777-9.035-1.824 9.035h-3.203L8.04 8.61h3.164l1.508 9.363 1.938-9.363h3.004l.04.203 1.688 9.1zm0 0" fill="rgb(16.078431%,34.117647%,58.431373%)"></path></svg>*/}
        {/*        </div>*/}
        {/*        <h3>Word to PDF</h3>*/}
        {/*        <div class="tools__item__content">*/}
        {/*            <p>Make DOC and DOCX files easy to read by converting them to PDF.</p>*/}
        {/*        </div>*/}
        {/*    </a>*/}
        {/*</div>*/}
        <div
          class="tools__item"
          style={{ minHeight: "300px", minWidth: "450px" }}
        >
          <a href="/PDFtoImage" title="PDF to JPG">
                <div class="tools__item__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50"><path d="M32.324 15.656h-9.55c-2.477 0-3.375.258-4.28.742a5.06 5.06 0 0 0-2.098 2.102c-.484.902-.742 1.8-.742 4.277v9.55H5.18c-1.8 0-2.453-.187-3.113-.54a3.69 3.69 0 0 1-1.527-1.527C.188 29.598 0 28.945 0 27.145V5.18c0-1.8.188-2.453.54-3.113A3.69 3.69 0 0 1 2.066.539C2.727.188 3.38 0 5.18 0h21.965c1.8 0 2.453.188 3.113.54a3.69 3.69 0 0 1 1.527 1.527c.352.66.54 1.313.54 3.113zm0 0" fill-rule="evenodd" fill="rgb(98.431373%,93.72549%,65.882353%)"></path><path d="M14.477 7.52c0-.477-.395-.863-.883-.863s-.883.387-.883.863v3.844L7.566 6.316a.89.89 0 0 0-1.246 0c-.168.16-.258.38-.258.61s.1.453.258.613l5.145 5.05H7.55c-.488 0-.883.387-.883.867s.395.863.883.863h6.047a.85.85 0 0 0 .34-.066c.215-.086.387-.254.477-.47.05-.102.066-.215.066-.328l.004-5.934zm0 0" fill="rgb(71.764706%,62.745098%,0.392157%)"></path><g fill-rule="evenodd"><path d="M22.855 17.676H44.82c1.8 0 2.453.188 3.113.543.648.344 1.184.875 1.527 1.527.352.656.54 1.31.54 3.11V44.82c0 1.8-.187 2.453-.54 3.113a3.69 3.69 0 0 1-1.527 1.527c-.66.352-1.312.54-3.113.54H22.855c-1.8 0-2.453-.187-3.113-.54-.648-.344-1.18-.88-1.527-1.527-.352-.66-.54-1.312-.54-3.113V22.855c0-1.8.188-2.453.54-3.113.348-.648.88-1.18 1.527-1.527.66-.352 1.313-.54 3.113-.54zm0 0" fill="rgb(83.921569%,74.901961%,17.647059%)"></path><path d="M41.5 26c1.102 0 2 .898 2 2s-.898 2-2 2-2-.898-2-2 .898-2 2-2zM30.6 39h-6.344c-.1 0-.172-.047-.215-.125s-.043-.168.004-.242l6.574-11.02a.26.26 0 0 1 .426 0l3.832 6.422 2.57-2.625c.047-.05.11-.074.176-.074h.008c.07 0 .137.03.18.086l6.1 7.13c.07.043.11.12.11.203 0 .133-.113.242-.246.242H30.6v-.004zm0 0" fill="rgb(100%,100%,100%)"></path></g></svg>
                </div>
                <h3>PDF to JPG</h3>
                <div class="tools__item__content">
                    <p>Convert each PDF page into a JPG or extract all images contained in a PDF.</p>
                </div>
            </a>
        </div>
       
        <div
          class="tools__item"
          style={{ minHeight: "300px", minWidth: "450px" }}
        >
          <a href="/ImageToPDF" title="JPG to PDF">
                <div class="tools__item__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50"><path d="M17.676 34.344h9.55c2.477 0 3.375-.258 4.28-.742a5.04 5.04 0 0 0 2.098-2.102c.484-.902.742-1.8.742-4.277v-9.547H44.82c1.8 0 2.453.188 3.113.54s1.176.87 1.527 1.527.54 1.31.54 3.113V44.82c0 1.8-.187 2.453-.54 3.113a3.69 3.69 0 0 1-1.527 1.527c-.66.352-1.312.54-3.113.54H22.855c-1.8 0-2.453-.187-3.113-.54s-1.172-.87-1.527-1.527-.54-1.312-.54-3.113zm0 0" fill-rule="evenodd" fill="rgb(98.431373%,93.72549%,65.882353%)"></path><path d="M43.94 37.137c0-.477-.395-.863-.883-.863s-.883.387-.883.863v3.844l-5.145-5.047c-.348-.34-.902-.34-1.25 0a.85.85 0 0 0-.258.609.86.86 0 0 0 .258.613l5.145 5.05h-3.914c-.488 0-.883.387-.883.867s.395.867.883.867h6.05c.113-.004.227-.023.336-.07a.87.87 0 0 0 .477-.465c.05-.105.066-.22.066-.332l.004-5.934zm0 0" fill="rgb(71.764706%,62.745098%,0.392157%)"></path><g fill-rule="evenodd"><path d="M5.184 0h21.988c1.8 0 2.453.188 3.113.54.652.344 1.184.88 1.527 1.53.352.656.54 1.313.54 3.113v21.984c0 1.805-.187 2.457-.54 3.117-.344.648-.875 1.184-1.527 1.527-.66.352-1.312.54-3.113.54H5.184c-1.8 0-2.457-.187-3.113-.54-.652-.344-1.184-.88-1.527-1.527C.188 29.625 0 28.973 0 27.168V5.184c0-1.8.188-2.457.54-3.113.344-.652.88-1.184 1.53-1.53S3.383 0 5.184 0zm0 0" fill="rgb(83.921569%,74.901961%,17.647059%)"></path><path d="M10.28 12.945v4.688c0 1.66-.926 2.66-2.707 2.66C5.406 20.293 5 18.852 5 18.07c0-.668.31-1.098.86-1.098.648 0 .813.504.813 1.05 0 .516.242.89.88.89.594 0 .926-.44.926-1.3V12.95c0-.54.352-.898.902-.898s.902.36.902.898zm1.672 6.402v-6.102c0-.8.418-1.055 1.055-1.055h2.762c1.516 0 2.738.75 2.738 2.508 0 1.44-1 2.508-2.75 2.508h-2v2.152c0 .54-.355.902-.902.902s-.902-.363-.902-.902zm1.805-5.773v2.242h1.68c.727 0 1.266-.437 1.266-1.12 0-.793-.56-1.12-1.45-1.12zm13.285 3.1v2.984c0 .332-.254.602-.613.602-.52 0-.66-.32-.773-1.023-.516.648-1.23 1.066-2.352 1.066-2.793 0-3.863-1.926-3.863-4.145 0-2.676 1.672-4.148 4.125-4.148 2.004 0 3.07 1.2 3.07 1.902 0 .63-.46.793-.848.793-.89 0-.56-1.242-2.32-1.242-1.242 0-2.223.813-2.223 2.816 0 1.56.77 2.637 2.246 2.637.957 0 1.793-.648 1.88-1.617H24.2c-.383 0-.812-.14-.812-.69 0-.44.254-.69.703-.69h2.223c.527 0 .738.262.738.758zm0 0" fill="rgb(100%,100%,100%)"></path></g></svg>
                </div>
                <h3>JPG to PDF</h3>
                <div class="tools__item__content">
                    <p>Convert JPG images to PDF in seconds. Easily adjust orientation and margins.</p>
                </div>
            </a>
        </div>
       

        <div
          class="tools__item"
          style={{ minHeight: "300px", minWidth: "450px" }}
        >
          <a href="/AddWatermark" title="Watermark">
                <div class="tools__item__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50"><path d="M8.012 0h33.977c2.785 0 3.797.29 4.813.836a5.65 5.65 0 0 1 2.363 2.363C49.71 4.215 50 5.227 50 8.012v33.977c0 2.785-.29 3.797-.836 4.813a5.65 5.65 0 0 1-2.363 2.363c-1.016.547-2.027.836-4.812.836H8.012c-2.785 0-3.797-.29-4.816-.836S1.38 47.82.836 46.8 0 44.773 0 41.988V8.012C0 5.227.29 4.215.836 3.2A5.65 5.65 0 0 1 3.199.836C4.215.29 5.227 0 8.012 0zm0 0" fill-rule="evenodd" fill="rgb(67.058824%,41.176471%,57.647059%)"></path><path d="M22.7 22.523c0 .863-1.094 3.023-2.11 4.668a.68.68 0 0 0-.078.523c.078.277.328.47.61.47h7.75a.63.63 0 0 0 .566-.352.65.65 0 0 0-.055-.672c-1.445-1.97-2.1-3.398-2.1-4.633s.645-2.66 2.094-4.637c.664-.937 1.012-2.043 1.012-3.195 0-3.02-2.422-5.477-5.398-5.477s-5.398 2.45-5.398 5.473a5.49 5.49 0 0 0 1.02 3.203c1.44 1.97 2.086 3.398 2.086 4.63zm14.02 6.55H13.266a.64.64 0 0 0-.633.645v6.465c0 .352.285.645.633.645H36.72a.64.64 0 0 0 .633-.645V29.72c0-.352-.285-.645-.633-.645zm-3.582 8.7H16.863a.64.64 0 0 0-.633.645v.727c0 .352.285.645.633.645h16.273a.64.64 0 0 0 .633-.645v-.727c0-.352-.285-.645-.633-.645zm0 0" fill="rgb(100%,100%,100%)"></path></svg>
                </div>
                <h3>Watermark</h3>
                <div class="tools__item__content">
                    <p>Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.</p>
                </div>
            </a>
        </div>
        {/*<div*/}
        {/*  class="tools__item"*/}
        {/*  style={{ minHeight: "300px", minWidth: "450px" }}*/}
        {/*>*/}
        {/*  <a href="/HtmltoPDF" title="HTML to PDF">*/}
        {/*        <div class="tools__item__icon">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 100 100" fill-rule="evenodd"><path d="M35.354 68.687h19.1c4.953 0 6.75-.516 8.56-1.484s3.232-2.39 4.2-4.2 1.484-3.607 1.484-8.56v-19.1H89.64c3.602 0 4.908.375 6.225 1.08a7.34 7.34 0 0 1 3.055 3.055c.704 1.317 1.08 2.623 1.08 6.225V89.64c0 3.602-.375 4.908-1.08 6.225a7.34 7.34 0 0 1-3.055 3.055c-1.317.704-2.623 1.08-6.225 1.08H45.713c-3.602 0-4.908-.375-6.225-1.08a7.34 7.34 0 0 1-3.055-3.055c-.704-1.317-1.08-2.623-1.08-6.225V68.687z" fill="#fbefa8"></path><path d="M87.88 74.277c0-.957-.79-1.733-1.766-1.733s-1.766.776-1.766 1.733v7.686L74.06 71.864a1.79 1.79 0 0 0-2.496 0 1.71 1.71 0 0 0 0 2.45L81.85 84.413h-7.828c-.976 0-1.766.776-1.766 1.733s.79 1.733 1.766 1.733h12.1a1.81 1.81 0 0 0 .674-.133c.43-.175.776-.513.954-.937.1-.21.136-.436.136-.66l.002-11.87z" fill="#b7a001" fill-rule="nonzero"></path><path d="M10.36 0h43.928c3.602 0 4.908.375 6.225 1.08a7.34 7.34 0 0 1 3.055 3.055c.704 1.317 1.08 2.623 1.08 6.225v43.928c0 3.602-.375 4.908-1.08 6.225a7.34 7.34 0 0 1-3.055 3.055c-1.317.704-2.623 1.08-6.225 1.08H10.36c-3.602 0-4.908-.375-6.225-1.08a7.34 7.34 0 0 1-3.055-3.055C.375 59.196 0 57.89 0 54.287V10.36C0 6.757.375 5.45 1.08 4.134a7.34 7.34 0 0 1 3.055-3.055C5.45.375 6.757 0 10.36 0z" fill="#d6bf2d"></path><path d="M6.444 37.69V26.63c0-.93.608-1.558 1.558-1.558S9.56 25.7 9.56 26.63v3.876h5.662V26.63c0-.93.608-1.558 1.558-1.558s1.558.627 1.558 1.558V37.69c0 .93-.608 1.558-1.558 1.558s-1.558-.627-1.558-1.558v-4.56H9.56v4.56c0 .93-.608 1.558-1.558 1.558s-1.558-.627-1.558-1.558zm18.126 0v-9.747h-2.945c-.893 0-1.615-.456-1.615-1.31s.722-1.31 1.615-1.31h9.006c.893 0 1.615.456 1.615 1.31s-.722 1.31-1.615 1.31h-2.945v9.747c0 .93-.608 1.558-1.558 1.558s-1.558-.627-1.558-1.558zm9.29.038V26.612c0-1.254.855-1.54 1.69-1.54h.912c.97 0 1.425.38 1.748 1.425l2.717 8.778h.038l2.68-8.778c.323-1.045.78-1.425 1.748-1.425h.874c.836 0 1.69.285 1.69 1.54v11.115c0 .78-.38 1.52-1.387 1.52s-1.387-.74-1.387-1.52v-8.474h-.038l-2.907 9.082c-.21.646-.684.912-1.33.912s-1.12-.266-1.33-.912l-2.907-9.082h-.038v8.474c0 .78-.38 1.52-1.387 1.52s-1.387-.74-1.387-1.52zm16.93-.55V26.63c0-.93.608-1.558 1.558-1.558s1.558.627 1.558 1.558v9.747h5.206c.893 0 1.615.456 1.615 1.31S60.005 39 59.112 39h-6.498c-1.102 0-1.824-.437-1.824-1.824z" fill="#fff" fill-rule="nonzero"></path></svg>*/}
        {/*        </div>*/}
        {/*        <h3>HTML to PDF</h3>*/}
        {/*        <div class="tools__item__content">*/}
        {/*            <p>Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.</p>*/}
        {/*        </div>*/}
        {/*    </a>*/}
        {/*</div>*/}

        <div
          class="tools__item"
          style={{ minHeight: "300px", minWidth: "450px" }}
        >
          <a href="/ProtectPDF" title="Protect PDF">
                <div class="tools__item__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 100 100"><path d="M16.024 0h67.95c5.572 0 7.593.58 9.63 1.67s3.636 2.688 4.725 4.725 1.67 4.058 1.67 9.63v67.95c0 5.572-.58 7.593-1.67 9.63s-2.688 3.636-4.725 4.725-4.058 1.67-9.63 1.67h-67.95c-5.572 0-7.593-.58-9.63-1.67S2.76 95.642 1.67 93.605 0 89.548 0 83.976v-67.95c0-5.572.58-7.593 1.67-9.63S4.358 2.76 6.395 1.67 10.452 0 16.024 0z" fill="#4A7AAB"></path><g fill="#fff"><path d="M49.485 21.715a2.5 2.5 0 0 1 2.031 0l21.5 9.556a2.5 2.5 0 0 1 1.485 2.285V47.89c0 14.445-10 27.82-23.407 31.095a2.5 2.5 0 0 1-1.186 0C36.5 75.708 26.5 62.334 26.5 47.89V33.556a2.5 2.5 0 0 1 1.485-2.285l21.5-9.556zM31.5 35.18v12.71c0 11.97 8.165 23.116 19 26.084 10.835-2.968 19-14.113 19-26.084V35.18l-19-8.444-19 8.444z" fill-rule="nonzero"></path><path d="M53.89 58.493h-7.713l1.178-9.56c-1.136-.798-1.874-2.088-1.874-3.546 0-2.422 2.038-4.386 4.553-4.386s4.553 1.964 4.553 4.386c0 1.457-.738 2.748-1.874 3.546l1.176 9.56z"></path></g></svg>
                </div>
                <h3>Protect PDF</h3>
                <div class="tools__item__content">
                    <p>Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access. </p>
                </div>
            </a>
        </div>

        {/*<div*/}
        {/*  class="tools__item"*/}
        {/*  style={{ minHeight: "300px", minWidth: "450px" }}*/}
        {/*>*/}
        {/*  <a href="/CompressPDF" title="Sign PDF">*/}
        {/*        <div class="tools__item__icon">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 100 100"><g fill="none"><path d="M16 0L84 0C89.5 0 91.6 0.6 93.6 1.7 95.6 2.8 97.2 4.4 98.3 6.4 99.4 8.4 100 10.5 100 16L100 84C100 89.5 99.4 91.6 98.3 93.6 97.2 95.6 95.6 97.2 93.6 98.3 91.6 99.4 89.5 100 84 100L16 100C10.5 100 8.4 99.4 6.4 98.3 4.4 97.2 2.8 95.6 1.7 93.6 0.6 91.6 0 89.5 0 84L0 16C0 10.5 0.6 8.4 1.7 6.4 2.8 4.4 4.4 2.8 6.4 1.7 8.4 0.6 10.5 0 16 0Z" fill="#AB6993"></path><path d="M16 0L84 0C89.5 0 91.6 0.6 93.6 1.7 95.6 2.8 97.2 4.4 98.3 6.4 99.4 8.4 100 10.5 100 16L100 84C100 89.5 99.4 91.6 98.3 93.6 97.2 95.6 95.6 97.2 93.6 98.3 91.6 99.4 89.5 100 84 100L16 100C10.5 100 8.4 99.4 6.4 98.3 4.4 97.2 2.8 95.6 1.7 93.6 0.6 91.6 0 89.5 0 84L0 16C0 10.5 0.6 8.4 1.7 6.4 2.8 4.4 4.4 2.8 6.4 1.7 8.4 0.6 10.5 0 16 0Z" fill="#4A7AAB"></path><g transform="translate(-371 -2828)translate(371 2828)translate(50.5 50.5)rotate(30)" fill="#FFF"><path d="M-16.2 3.8L-2.3 29.5C-2.1 29.7-1.9 29.8-1.7 29.7 -1.5 29.6-1.4 29.5-1.4 29.3L-1.4 10.6C-3.8 10-5.5 7.9-5.5 5.4 -5.5 2.5-3.1 0.1-0.2 0.1 2.8 0.1 5.2 2.5 5.2 5.4 5.2 7.9 3.4 10 1 10.6L1 29.3C1 29.5 1.2 29.7 1.5 29.7 1.6 29.7 1.8 29.6 1.9 29.5L15.8 3.8C16.2 3 16.2 2.2 15.9 1.4L8.4-15.1C8-16.1 7.1-16.7 6-16.7L-6.4-16.7C-7.5-16.7-8.4-16.1-8.9-15.1L-16.3 1.4C-16.6 2.2-16.6 3-16.2 3.8Z"></path><path d="M9-18.7L-9.4-18.7C-10.3-18.7-11.1-19.7-11.1-20.9L-11.1-28.3C-11.1-29.5-10.3-30.5-9.4-30.5L9-30.5C10-30.5 10.8-29.5 10.8-28.3L10.8-20.9C10.8-19.7 10-18.7 9-18.7Z"></path></g></g></svg>*/}
        {/*        </div>*/}
        {/*        <h3>Sign PDF</h3>*/}
        {/*        <div class="tools__item__content">*/}
        {/*            <p>Sign yourself or request electronic signatures from others.</p>*/}
        {/*        </div>*/}
        {/*    </a>*/}
        {/*</div>*/}

        {/*<div*/}
        {/*  class="tools__item"*/}
        {/*  style={{ minHeight: "300px", minWidth: "450px" }}*/}
        {/*>*/}
        {/*  <a href="/CompressPDF" title="Rotate PDF">*/}
        {/*        <div class="tools__item__icon">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 50 50" fill-rule="evenodd"><path d="M8.012 0h33.976c2.786 0 3.796.3 4.815.835a5.68 5.68 0 0 1 2.363 2.363c.545 1.02.835 2.03.835 4.815v33.976c0 2.786-.3 3.796-.835 4.815a5.68 5.68 0 0 1-2.363 2.363c-1.02.545-2.03.835-4.815.835H8.012c-2.786 0-3.796-.3-4.815-.835a5.68 5.68 0 0 1-2.363-2.363C.3 45.784 0 44.774 0 41.988V8.012c0-2.786.3-3.796.835-4.815A5.68 5.68 0 0 1 3.197.835C4.216.3 5.226 0 8.012 0z" fill="#AB6993"></path><g fill="#FFF"><path d="M23.366 13.26a1.25 1.25 0 1 1 .318 2.48c-5.352.686-9.434 5.212-9.434 10.638 0 4.407 2.692 8.285 6.726 9.926a1.25 1.25 0 0 1-.942 2.316c-4.963-2.02-8.284-6.804-8.284-12.242 0-6.697 5.03-12.273 11.616-13.118zm14.778 11.437a1.25 1.25 0 1 1-2.475.354 11.6 11.6 0 0 0-.905-3.163 1.25 1.25 0 1 1 2.278-1.03c.545 1.205.908 2.482 1.102 3.84zM26.71 39.493a1.25 1.25 0 0 1-.354-2.475c1.1-.157 2.125-.445 3.09-.872a1.25 1.25 0 0 1 1.013 2.286c-1.178.522-2.425.872-3.748 1.06zm8.792-4.998a1.25 1.25 0 1 1-2-1.5c.718-.957 1.262-1.91 1.627-2.866a1.25 1.25 0 1 1 2.335.893C37 32.206 36.35 33.36 35.5 34.495z" fill-rule="nonzero"></path><path d="M24.282 21c-.427 0-.78-.354-.78-.78V9.28c0-.427.354-.78.78-.78.208 0 .403.085.55.232l5.47 5.47c.146.146.232.342.232.55s-.085.403-.232.55l-5.47 5.47c-.146.146-.342.232-.55.232z"></path></g></svg>*/}
        {/*        </div>*/}
        {/*        <h3>Rotate PDF</h3>*/}
        {/*        <div class="tools__item__content">*/}
        {/*            <p>Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!</p>*/}
        {/*        </div>*/}
        {/*    </a>*/}
        {/*</div>*/}

        {/*<div*/}
        {/*  class="tools__item"*/}
        {/*  style={{ minHeight: "300px", minWidth: "450px" }}*/}
        {/*>*/}
        {/* <a href="/CompressPDF" title="Unlock PDF">*/}
        {/*        <div class="tools__item__icon">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 100 100" fill-rule="evenodd"><path d="M16.024 0h67.95c5.572 0 7.593.58 9.63 1.67s3.636 2.688 4.725 4.725 1.67 4.058 1.67 9.63v67.95c0 5.572-.58 7.593-1.67 9.63s-2.688 3.636-4.725 4.725-4.058 1.67-9.63 1.67h-67.95c-5.572 0-7.593-.58-9.63-1.67S2.76 95.642 1.67 93.605 0 89.548 0 83.976v-67.95c0-5.572.58-7.593 1.67-9.63S4.358 2.76 6.395 1.67 10.452 0 16.024 0z" fill="#4a7aab"></path><path d="M70.607 44.156h-30.35l.033-10.502c.18-2.232 1.377-4.486 3.2-6.03 1.898-1.603 4.092-2.37 6.652-2.344a12.07 12.07 0 0 1 .91.043c4.586.37 8.4 4.088 8.68 8.466.03.43.014.8-.005 1.636l-.05 2.586a2.64 2.64 0 0 0 2.602 2.678c1.482-.012 2.657-1.145 2.678-2.602l.048-2.54c.023-.992.034-1.492-.004-2.1-.447-6.933-6.39-12.815-13.527-13.4-.43-.034-.858-.054-1.28-.06h-.183c-3.77 0-7.11 1.208-9.933 3.593-2.873 2.432-4.763 6.035-5.053 9.633-.02.225-.074.925-.05 10.93h-5.582c-.77 0-1.393.625-1.393 1.393v29.525c0 .77.625 1.393 1.393 1.393h41.214c.77 0 1.393-.625 1.393-1.393V45.55c0-.77-.623-1.393-1.393-1.393zM53.415 68.06h-6.83l1.043-8.468c-1.006-.707-1.66-1.85-1.66-3.14 0-2.145 1.805-3.884 4.033-3.884s4.033 1.74 4.033 3.884c0 1.3-.653 2.434-1.66 3.14l1.042 8.468z" fill="#fff" fill-rule="nonzero"></path></svg>*/}
        {/*        </div>*/}
        {/*        <h3>Unlock PDF</h3>*/}
        {/*        <div class="tools__item__content">*/}
        {/*            <p>Remove PDF password security, giving you the freedom to use your PDFs as you want.</p>*/}
        {/*        </div>*/}
        {/*    </a>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default PDFTools;
