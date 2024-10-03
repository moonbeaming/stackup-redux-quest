import type { ErrorResponse } from "../error-types";
import { useDeletePostMutation } from "./blogSlice";
import type { BlogModel } from "./types";

const DeletePostButton = ({ post }: { post: BlogModel }) => {
	const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();
	return (
		<>
			<button
				type="button"
				onClick={() =>
					deletePost({ id: post.id, title: post.title })
						.then((payload) => {
							if (
								payload.data?.ok !== undefined &&
								payload.data?.message !== undefined
							) {
								if (payload.data?.ok) {
									alert(payload.data?.message);
									return;
								}
							}
							const error = payload.error as ErrorResponse | undefined;
							alert(error?.message);
						})
						.catch((error) =>
							console.error(`Failed to delete with error: ${error}`)
						)
				}
			>
				{isDeletingPost ? "Deleting..." : "Delete Post"}
			</button>
		</>
	);
};

export default DeletePostButton;
