import { useContext, useEffect, useState } from "react";
import { CommentDTO } from "../../api";
import { ClientsContext } from "../../store/ClientsStore";
import XssComponent from "./XssComponent";

const XssContainer = () => {
    const { commentClient } = useContext(ClientsContext);
    const [comments, setComments] = useState<CommentDTO[]>([]);

    async function getComments() {
        setComments(await commentClient.getAllComments());
    }

    async function addComment(commentText: string) {
        await commentClient.createNewComment({ body: commentText });
        getComments();
    }

    useEffect(() => {
        getComments();
    }, []);

    return <XssComponent comments={comments} addComment={addComment} />
}

export default XssContainer;