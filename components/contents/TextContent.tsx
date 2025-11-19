
import { Text, Transformer } from 'react-konva'
import { contentsMap } from '../globalState/contentsMap'
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { useCurrentSelectedItem } from '../globalState/useCurrentSelectedItem';
import useTransformationSave from '@/lib/hooks/useTransformationSave';


/**
 * Renders a text content block on the slide canvas with support for drag, resize, rotation, and inline editing.
 *
 * Uses `Konva.Text` and `Konva.Transformer` for interactive editing.
 *
 * @component
 * @param {string} props.id - The unique ID of the text content to render.
 * @returns {JSX.Element | null} A draggable and transformable text block, or `null` if the content is not available.
 *
 * @behavior
 * - Loads the text content from `contentsMap` by ID.
 * - Supports inline editing by creating a temporary HTML `<textarea>` overlay.
 * - Applies a `Transformer` to allow resizing and rotation.
 * - Limits the minimum width and height of the text block to 20px.
 * - Updates local state and `contentsMap` when the text is edited, dragged, or transformed.
 * - Automatically removes the `<textarea>` and updates the state when editing is finished (blur or Enter key).
 *
 * @example
 * <TextContent id="text_123" />
 */

type Props = {
    id: string
}

export default function TextContent({ id }: Props) {
    const textRef = useRef<Konva.Text | null>(null)

    //handle Click Selection
    const setGlobalSelectedItem = useCurrentSelectedItem.getState().setCurrentSelectedItem;
    function handleClick() {
        setIsEditing(true);
        setGlobalSelectedItem({ id, ref: textRef });
    }

    //get text content from contentsMap
    const [content, setContent] = useState(contentsMap.get(id));
    //state to track if text is being typed
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isEditing) {
            createTextArea();
        }
    }, [isEditing]);

    //handle transformer(resize and rotate) when content changes
    const { handleTransformEnd, handleDragEnd } = useTransformationSave({
        id,
        content,
        contentRef: textRef,
        localStateSetter: setContent,
    })


    function createTextArea() {
        const textNode = textRef.current;
        if (!textNode) return;
        //get current konva stage
        const stage = textNode.getStage()
        if (!stage) return;
        //fincd the container of the stage
        const container = stage.container();
        //build a new html textarea element
        const textarea = document.createElement('textarea');


        container.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = "absolute";
        textarea.style.top = textNode.y() + "px";
        textarea.style.left = textNode.x() + "px";
        textarea.style.width = textNode.width() + "px";
        textarea.style.height = textNode.height() + "px";
        textarea.style.fontSize = textNode.fontSize() + "px";
        textarea.style.border = "1px solid #222";
        textarea.style.padding = "4px";
        textarea.style.margin = "0";
        textarea.style.background = "white";
        textarea.style.zIndex = "10";
        textarea.style.outline = "none";
        textarea.style.resize = "none";

        textarea.focus();

        //Finish editing on blur or enter key
        textarea.addEventListener('blur', () => {
            finishEditing(textarea);
        })
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                textarea.blur();
            }
        })
    }

    //save the textArea and update the content in original text
    function finishEditing(textarea: HTMLTextAreaElement) {
        //get updated text, create new content object
        const newText = textarea.value;
        if (content) {
            const updated = {
                ...content,
                text: newText
            }

            //update local state and contentsMap
            setContent(updated);
            contentsMap.set(id, updated);

            //change editing state back
            setIsEditing(false);

            //remove textarea from dom
            textarea.remove();
        }
    }

    //render empty div if no text content
    if (!content) return null

    return (
        <>
            <Text
                ref={textRef}
                key={content.id}
                x={content.x}
                y={content.y}
                width={content.width}
                height={content.height}
                rotation={content.rotation}
                text={content.text || "Sample Text"}
                fontSize={24}
                fill="black"
                draggable
                onTransformEnd={handleTransformEnd}
                onDragEnd={handleDragEnd}
                onClick={handleClick}
                onTap={handleClick}
            />


        </>

    )
}
