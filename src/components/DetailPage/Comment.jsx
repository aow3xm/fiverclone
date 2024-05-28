import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, postComment } from "../../redux/actions/commentAction";
import { List, Avatar, Input, Button, Rate, Pagination, message } from "antd";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
const { TextArea } = Input;
const Comment = ({ maCongViec }) => {
  const dispatch = useDispatch();
  const commentsList = useSelector((state) => state.comments.commentsList);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchComments(maCongViec));
  }, [dispatch, maCongViec]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitComment = () => {
    if (!user) {
      message.error("You must be signed in to comment");
      return;
    }
    if (comment.trim() !== "") {
      const token = jwtDecode(user);
      const newComment = {
        id: 0,
        maCongViec,
        maNguoiBinhLuan: token.id,
        ngayBinhLuan: new Date().toISOString(),
        noiDung: comment,
        saoBinhLuan: rating,
      };

      dispatch(postComment(newComment, user)).then(() => {
        dispatch(fetchComments(maCongViec));
      });
      setComment("");
      setRating(0);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const offset = (currentPage - 1) * commentsPerPage;
  const currentComments = commentsList.slice(offset, offset + commentsPerPage);
  const totalComments = commentsList.length;

  return (
    <div className="border rounded p-3">
      <List
        dataSource={currentComments}
        header={`${totalComments} ${
          totalComments > 1 ? "comments" : "comment"
        }`}
        itemLayout="horizontal"
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={comment.avatar} />}
              title={comment.tenNguoiBinhLuan}
              description={
                <>
                  <div>{comment.noiDung}</div>
                  <div>
                    <Rate
                      disabled
                      value={
                        comment.saoBinhLuan !== 0 ? comment.saoBinhLuan : 5
                      }
                    />
                    <span style={{ marginLeft: 8 }}>
                      {moment(comment.ngayBinhLuan).format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </span>
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={commentsPerPage}
          total={totalComments}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <TextArea
          rows={4}
          placeholder="Write a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <Rate
          value={rating}
          onChange={handleRatingChange}
          style={{ marginTop: 8 }}
        />
        <Button
          type="primary"
          onClick={handleSubmitComment}
          disabled={comment.trim() === ""}
          style={{ marginTop: 8 }}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default Comment;
