import { Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { CommentDTO } from "../../api";

interface CommentProps {
    comment: CommentDTO,
    isSecure: boolean
}

const Comment = (props: CommentProps) => {
    useEffect(() => {
        console.log(props.isSecure)
    })
    return <Card sx={{ minWidth: "25%", marginTop: "10px" }}>
        <CardContent>
            {
                props.isSecure ?
                    <Typography sx={{ margin: "10px" }}>
                        {props.comment.commentText}
                    </Typography> :
                    <span dangerouslySetInnerHTML={{ __html: props.comment.commentText! }} />
            }
        </CardContent>
    </Card>
}

export default Comment;