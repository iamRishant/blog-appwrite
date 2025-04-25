import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/db";
import { Container } from "../components/Index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../components/Button";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
                setLoading(false);
            }).catch(() => {
                setLoading(false);
                navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">Loading post...</p>
                    </div>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="py-4 md:py-8">
            <Container>
                <div className="w-full flex flex-col md:flex-row justify-center mb-4 relative border rounded-xl p-2">
                    <img 
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full md:w-1/2 lg:w-[40%] xl:w-[30%] mb-4 md:mb-0"
                    />

                    {isAuthor && (
                        <div className="flex justify-center md:absolute md:right-6 md:top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-4 md:mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css prose prose-sm md:prose-base lg:prose-lg max-w-none">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}