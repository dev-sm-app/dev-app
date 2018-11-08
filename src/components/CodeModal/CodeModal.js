import React from "react"
import { Controlled as CodeMirror } from "react-codemirror2"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/python/python"
import "codemirror/mode/ruby/ruby"
import "codemirror/mode/htmlembedded/htmlembedded"
import "codemirror/mode/css/css"
import "codemirror/mode/sass/sass"
import "codemirror/mode/markdown/markdown"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/seti.css"

function CodeModal(props) {
    const className = props.show ? "code_display" : "code_none"
    const options = {
        mode: props.mode,
        theme: "seti",
        lineNumbers: true
    }
    return (
        <div className={className}>
            <div className="code_modal_content">
                <select defaultValue="javascript" onChange={props.updateMode}>
                    <option value="javascript">javascript</option>
                    <option value="python">python</option>
                    <option value="ruby">ruby</option>
                    <option value="htmlembedded">html</option>
                    <option value="css">css</option>
                    <option value="sass">sass</option>
                    <option value="markdown">markdown</option>
                </select>
                <CodeMirror 
                value={props.code}
                options={options}
                onBeforeChange={(editor, data, code) => {
                    props.updateCode(code)
                }}
                onChange={(editor, data, value) => {}}/>
                <button
                name="showModal"
                onClick={props.toggleShow}
                >Save</button>
            </div>
        </div>
    )
}

export default CodeModal