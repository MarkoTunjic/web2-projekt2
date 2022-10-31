import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { CommentDTO } from "../../api";
import Comment from "../../components/comment/Comment";

interface XssComponentProps {
    comments: CommentDTO[],
    addComment: (commentText: string) => void
}

const XssComponent = (props: XssComponentProps) => {
    const [isSecure, setIsSecure] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>();
    const header = "for testing try <img> tag becouse <script> does not work in react."
    const example = "Example: <img src=\"hacked\" onError=alert('myMessage')>"

    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1>Xss {header}</h1>
        <h2>{example}</h2>
        <FormControlLabel
            label={"Is secure?"}
            control={<Checkbox
                checked={isSecure}
                onChange={(event: any) => setIsSecure(event.target.checked)}
            />}
        />
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TextField
                id="add-comment"
                multiline
                label="Add comment"
                variant="filled"
                sx={{ marginBottom: "10px" }}
                rows={4}
                value={newComment}
                onChange={(event: any) => {
                    setNewComment(event.target.value);
                }} />
            <Button onClick={() => {
                props.addComment(newComment!.toString());
                setNewComment("");
            }}>Submit</Button>
        </Box>
        {props.comments.map(comment => <Comment isSecure={isSecure} key={comment.id} comment={comment} />)}
    </Box>;
}

export default XssComponent;