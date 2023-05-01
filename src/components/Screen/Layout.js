import { Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const history = useHistory();
  const mailDetail = useSelector((state) => state.detail);
  
  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="bg-dark w-25 vh-100 ">
          <div>
            <button
              className="w-100 p-2 mt-5 mb-5 bg-primary text-white border border-none"
              onClick={() => history.push("/compose")}
            >
              Compose
            </button>
            <button
              className="w-100 p-1 border border-none"
              onClick={() => history.push("/inbox")}
            >
              Inbox
              <Badge bg="info">
                {
                  mailDetail?.inboxList?.filter(
                    (item) => item.markAsRead === false
                  ).length
                }
                Unread
              </Badge>
            </button>
            <button className="w-100 p-1 border border-none">Unread</button>
            <button className="w-100 p-1 border border-none">Starred</button>
            <button className="w-100 p-1 border border-none">Drafts</button>
            <button className="w-100 p-1 border border-none">Archive</button>
            <button className="w-100 p-1 border border-none">Spam</button>
            <button className="w-100 p-1 border border-none">
              Deleted Items
            </button>
            <button
              className="w-100 p-1 border border-none"
              onClick={() => history.push("/sent")}
            >
              Sent
            </button>
          </div>
        </div>
        <div className="w-75">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
