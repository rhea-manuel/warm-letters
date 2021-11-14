import { addDoc, doc, getFirestore, setDoc } from "@firebase/firestore";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Pane, Icon, HeartIcon, Button, toaster, Heading } from "evergreen-ui";
import { collection } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import { EditorState, Editor } from "react-draft-wysiwyg";
import { useLocation, useNavigate } from "react-router";
import { Navigation } from "../Navigation/Navigation";
import reply from "../../image/reply.png";
import { HeaderWrapper } from "../HeaderWrapper";
import Axios from "axios";
import axios from "axios";

export const Reply: FunctionComponent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [content, setContent] = useState<EditorState>();
  const [toxic, setToxic] = useState(false);

  const db = getFirestore();

  console.log(state);
  return (
    <HeaderWrapper image={reply}>
      <Navigation />
      {state.id && state.content && state.user ? (
        <Pane display="flex">
          <Pane width="50%" marginRight={16} className="pane">
            <Heading className="heading2" size={900} marginBottom={16}>
              Incoming Message:{" "}
            </Heading>
            <div dangerouslySetInnerHTML={{ __html: state.content }}></div>
          </Pane>
          <Pane width="50%" marginRight={16} className="pane">
            <Heading className="heading2" size={900}>
              Your reply:{" "}
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
                  const axiosResponse = await Axios.post(
                    `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.REACT_APP_API_KEY}`,
                    {
                      comment: {
                        text: content.getCurrentContent().getPlainText(),
                      },
                      languages: ["en"],
                      requestedAttributes: { TOXICITY: {}, INCOHERENT: {} },
                    }
                  );

                  console.log(axiosResponse.data);

                  if (
                    axiosResponse.data.attributeScores.TOXICITY.summaryScore
                      .value < 0.7 ||
                    axiosResponse.data.attributeScore.INCOHERENT.summaryScore
                      .value > 0.7
                  ) {
                    const html = draftToHtml(
                      convertToRaw(content?.getCurrentContent())
                    );
                    const response = await addDoc(collection(db, "responses"), {
                      user: state.user,
                      letterId: state.id,
                      content: html,
                    });
                    console.log("response: ", response);

                    const letter = await setDoc(
                      doc(db, "letters", state.id),
                      { responseId: response.id },
                      { merge: true }
                    );

                    console.log("Updated letter: ", letter);
                    navigate("/confirmation");
                  }
                } else {
                  toaster.danger(
                    "Your response appears to be either spam or toxic, so it could not be submitted."
                  );
                }
              }}
            >
              <Icon icon={HeartIcon} marginRight={6} />
              Send reply!
            </Button>
          </Pane>
        </Pane>
      ) : (
        <Pane className="pane">You must select a letter to reply first.</Pane>
      )}
    </HeaderWrapper>
  );
};
