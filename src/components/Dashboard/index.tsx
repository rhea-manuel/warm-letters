import {
  Button,
  Icon,
  Pane,
  SendMessageIcon,
  HeartIcon,
  toaster,
  Heading,
  Image,
} from "evergreen-ui";
import { FunctionComponent, useState } from "react";
// import { UserType } from "../../App";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useQuery } from "react-query";
import { Navigation } from "../Navigation/Navigation";
import { getAuth } from "@firebase/auth";
import logo from "../../image/logo.png";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router";
// import { UserState } from "../../App";

import Axios from "axios";

export const Dashboard: FunctionComponent = () => {
  //   const { user } = useContext(UserContext);
  const [content, setContent] = useState<EditorState>();
  const db = getFirestore();

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery("letters", () => {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error("No user!");
    }
    const letterCollection = collection(db, "letters");

    const letterQ = query(
      letterCollection,
      where("user", "!=", user.uid),
      where("responseId", "==", "")
    );
    // All the letters that you can respond to
    const allLetters = getDocs(letterQ).then((querySnapshot) => {
      const list: any[] = [];
      querySnapshot.forEach((doc) => {
        const letter = doc.data();
        console.log(doc.id, letter);

        list.push({ ...letter, id: doc.id });
      });
      return list;
    });

    return allLetters;
  });

  if (isLoading) {
    return <DashboardWrapper>Loading...</DashboardWrapper>;
  }
  if (error) {
    return <DashboardWrapper>errror</DashboardWrapper>;
  }

  return (
    <DashboardWrapper>
      <Navigation />
      <Pane display="flex">
        <Pane width={"25%"} marginRight={16} className="pane">
          <Heading className="heading2" size={900} marginBottom={16}>
            Incoming letter:
          </Heading>
          {data && (
            <div dangerouslySetInnerHTML={{ __html: data[0].content }}></div>
          )}
          <br />
          <Button
            marginTop={16}
            className="button"
            onClick={(event: any) => {
              if (data) {
                navigate("/reply", { state: data[0] });
              } else {
                event.preventDefault();
              }
            }}
          >
            <Icon icon={HeartIcon} marginRight={6} />
            Reply
          </Button>
        </Pane>
        <Pane width="80%" padding={32} className="pane">
          <Heading className="heading2" size={900}>
            Compose a new letter:
          </Heading>
          <Editor
            toolbarClassName="toolbar"
            editorClassName="editor"
            editorState={content}
            onEditorStateChange={setContent}
          ></Editor>
          <Button
            size="large"
            className="button"
            onClick={async () => {
              if (content) {
                const user = getAuth().currentUser;
                if (!user) {
                  throw new Error("No user!");
                }

                const axiosResponse = await Axios.post(
                  `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.REACT_APP_API_KEY}`,
                  {
                    comment: {
                      text: content.getCurrentContent().getPlainText(),
                    },
                    languages: ["en"],
                    requestedAttributes: { TOXICITY: {} },
                  }
                );

                console.log(axiosResponse.data);

                if (
                  axiosResponse.data.attributeScores.TOXICITY.summaryScore
                    .value < 0.7
                ) {
                  const html = draftToHtml(
                    convertToRaw(content.getCurrentContent())
                  );
                  const docRef = addDoc(collection(db, "letters"), {
                    user: user.uid,
                    responseId: "",
                    content: html,
                  });
                  console.log(docRef);

                  toaster.notify(
                    "Your letter has been sent! You can check for responses under the first tab."
                  );

                  navigate("/confirmation");
                } else {
                  toaster.danger(
                    "Your letter appears to be either spam or toxic, so it could not be submitted."
                  );
                }
              }
            }}
          >
            <Icon icon={SendMessageIcon} marginRight={6} />
            Send letter!
          </Button>
        </Pane>
      </Pane>
    </DashboardWrapper>
  );
};

export const DashboardWrapper = ({ children }: { children: any }) => {
  return (
    <>
      <Image
        alt="Warm Letters Logo"
        src={logo}
        textAlign="center"
        marginX="auto"
        display="flex"
      />
      <Pane paddingX={32}>{children}</Pane>
    </>
  );
};
