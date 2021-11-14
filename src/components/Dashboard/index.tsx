import { Button, Icon, Pane, SendMessageIcon, HeartIcon } from "evergreen-ui";
import { FunctionComponent, useContext, useState } from "react";
import { LetterType, UserContext } from "../../context";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { useQuery } from "react-query";
import { Navigation } from "../Navigation/Navigation";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { UserState } from "../../App";

export const Dashboard: FunctionComponent<UserState> = ({ user, setUser }) => {
  //   const { user } = useContext(UserContext);
  const [content, setContent] = useState<EditorState>();

  const db = getFirestore();
  const letterCollection = collection(db, "letters");

  const letterQ = query(
    letterCollection,
    where("user", "!=", user.uid),
    where("responseId", "==", "")
  );

  const { isLoading, error, data } = useQuery(
    "letters",
    () => {
      // All the letters that you can respond to
      const allLetters = getDocs(letterQ).then((querySnapshot) => {
        const list: any[] = [];
        querySnapshot.forEach((doc) => {
          const letter = doc.data();
          console.log(doc.id, letter);

          list.push(letter);
        });
        return list;
      });

      return allLetters;
    },
    { retry: false }
  );

  if (isLoading) {
    return <Pane>loading...</Pane>;
  }
  if (error) {
    return <Pane>errror</Pane>;
  }
  //   if (user) {
  //     return (
  //       <Pane>
  //         You are logged in, user: {user.uid}
  //         <Button>Your Letters</Button>
  //       </Pane>
  //     );
  //   }

  return (
    <Pane paddingX={32}>
      <Navigation />
      <Pane display="flex">
        <Pane
          background="white"
          width={"25%"}
          padding="4%"
          marginRight={16}
          border="2px solid #FB8F85"
          boxShadow="box-shadow: 18px 20px 0px -11px rgba(251,143,133,1);
        -webkit-box-shadow: 18px 20px 0px -11px rgba(251,143,133,1);
        -moz-box-shadow: 18px 20px 0px -11px rgba(251,143,133,1);"
        >
          {data && (
            <div dangerouslySetInnerHTML={{ __html: data[0].content }}></div>
          )}
          <br />
          <Button marginTop={16} className="button">
            <Icon icon={HeartIcon} marginRight={6} />
            Reply
          </Button>
        </Pane>
        {/* {data.map((item) => (
        <Pane key={item.id}>{item.content}</Pane>
      ))} */}
        <Pane
          background="white"
          // width={"25%"}
          width="80%"
          padding={32}
          border="2px solid #FB8F85"
          boxShadow="box-shadow: 18px 20px 0px -11px rgba(251,143,133,1);
        -webkit-box-shadow: 18px 20px 0px -11px rgba(251,143,133,1);
        -moz-box-shadow: 18px 20px 0px -11px rgba(251,143,133,1);"
        >
          <Editor
            toolbarClassName="toolbar"
            editorClassName="editor"
            editorState={content}
            onEditorStateChange={setContent}
          ></Editor>
          <Button
            size="large"
            className="button"
            onClick={() => {
              if (content) {
                const html = draftToHtml(
                  convertToRaw(content?.getCurrentContent())
                );
                const docRef = addDoc(collection(db, "letters"), {
                  user: user.uid,
                  responseId: "",
                  content: html,
                });
              }
            }}
          >
            <Icon icon={SendMessageIcon} marginRight={6} />
            Send letter!
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};
