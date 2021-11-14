import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { query, where, getDoc, doc } from "firebase/firestore";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { HeaderWrapper } from "../HeaderWrapper";

import repliestome from "../../image/repliestome.png";
import { Navigation } from "../Navigation/Navigation";
import { Heading, Pane } from "evergreen-ui";

import { find } from "lodash";

export const ViewReplies = () => {
  const db = getFirestore();
  const navigate = useNavigate();

  const letters = useQuery<any>("letters");

  const { isLoading, error, data } = useQuery("responses", () => {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error("No user!");
    }

    const responseCollection = collection(db, "responses");
    const responseQ = query(responseCollection, where("user", "==", user.uid));

    const allResponses = getDocs(responseQ).then((querySnapshot) => {
      const list: any[] = [];

      querySnapshot.forEach((document) => {
        const response = document.data();
        console.log("Response: ", document.id, response);

        list.push({ ...response, id: document.id });
      });

      return list;
    });

    return allResponses;
  });

  if (isLoading) {
    return (
      <HeaderWrapper image={repliestome}>
        <Navigation />
        Loading...
      </HeaderWrapper>
    );
  }

  if (error) {
    return (
      <HeaderWrapper image={repliestome}>
        <Navigation />
        Error loading replies to your messages, try again later.
      </HeaderWrapper>
    );
  }

  console.log("Data: ", data);
  return (
    <HeaderWrapper image={repliestome}>
      <Navigation />
      <Pane display="flex">
        <Pane width="50%" marginRight={16} className="pane">
          <Heading className="heading2" size={900} marginBottom={16}>
            Latest reply:
          </Heading>
          {data ? (
            data[0] && (
              <div dangerouslySetInnerHTML={{ __html: data[0].content }}></div>
            )
          ) : (
            <div>You have no replies yet, check back later!</div>
          )}
        </Pane>
        <Pane width="45%" height="60vh" overflowY="auto" padding={8}>
          <Heading className="heading2" size={900} marginBottom={16}>
            Older replies:
          </Heading>
          {data && data.length > 1 ? (
            data.map((item: { id: string; content: string }, index) => {
              if (index !== 0) {
                return (
                  <Pane
                    key={"response-" + index}
                    className="pane"
                    marginBottom={16}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                  </Pane>
                );
              }
              return null;
            })
          ) : (
            <Pane className="pane">No older replies.</Pane>
          )}
        </Pane>
      </Pane>
    </HeaderWrapper>
  );
};
