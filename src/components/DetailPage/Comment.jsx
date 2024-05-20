import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/actions/commentAction";
import { List, Avatar, Input, Button, Rate, Pagination } from "antd";

const { TextArea } = Input;

const Comment = ({ maCongViec }) => {
  const dispatch = useDispatch();
  const commentsList = useSelector((state) => state.comments.commentsList);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  useEffect(() => {
    dispatch(fetchComments(maCongViec));
  }, [dispatch, maCongViec]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== "") {
      const newComment = {
        id: Date.now(),
        ngayBinhLuan: new Date().toLocaleDateString("vi-VN"),
        noiDung: comment,
        saoBinhLuan: 0,
        tenNguoiBinhLuan: "User",
        avatar: "",
      };
      // dispatch(addComment(newComment));
      setComment("");
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
                    <Rate disabled value={comment.saoBinhLuan !== 0 ? comment.saoBinhLuan : 5} />
                    <span style={{ marginLeft: 8 }}>
                      {comment.ngayBinhLuan}
                    </span>
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
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