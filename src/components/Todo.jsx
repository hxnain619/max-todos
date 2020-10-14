import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import CheckTwoToneIcon from "@material-ui/icons/CheckTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

const Todo = ({ todo, markComplete, delTodo, editTodo }) => {
  const matches = useMediaQuery("(max-width: 768px)");
  let checkedStyle = { textDecoration: "none" };
  if (todo.completed) checkedStyle.textDecoration = "line-through";
  else checkedStyle.textDecoration = "none";
  // todo.completed ? (checkedStyle.textDecoration = "line-through") : null;
  const cardStyles = {
    marginTop: matches ? 20 : 35,
    background: "lightgray",
  };
  return (
    <Container>
      <Card className="root" variant="outlined" style={cardStyles}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={checkedStyle}
            className="todo-text"
          >
            <IconButton
              style={{ marginRight: 5 }}
              onClick={() => markComplete(todo.id)}
              centerRipple={false}
            >
              <CheckTwoToneIcon color="action" />
            </IconButton>
            {todo.title}
            <IconButton
              style={{ float: "right" }}
              onClick={() => {
                const confirmation = window.confirm("Delete this to-do?");
                if (confirmation) delTodo(todo.id);
              }}
              centerRipple={false}
            >
              <DeleteTwoToneIcon color="error" />
            </IconButton>
            <IconButton
              style={{ float: "right" }}
              onClick={editTodo.bind(this, todo.id, todo.title)}
              centerRipple={false}
            >
              <EditTwoToneIcon color="primary" />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Todo;
