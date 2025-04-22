import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { useSelector, useDispatch } from "react-redux";

import { IStore } from "../interfaces/store";
import { clearLoginUser } from "../redux/actions/userLogin";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: currentUser } = useSelector((store: IStore) => store.loginUser);
  console.log('curr', currentUser)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { token } = currentUser;
  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  const logout = () => {
    setIsDialogOpen(false);
    dispatch(clearLoginUser());
    navigate("/");
  };
  // for show all the projects based on manager ID
  const getAllBooking = () => {
    navigate("/history")
  }
  const getAllStatus = () => {
    navigate("/status")
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        zIndex: 999,
        background: "linear-gradient(to right, darkblue,#7409ed, #5d09ed, #165ccc, #0961ed, #09a1ed)",
        opacity: 0.95,
        padding: "10px",
        flexWrap: "wrap",
      }}
    >
      {!token ? (
        <></>
      ) : (
        <>
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "15px" }}>
              <p style={{ fontWeight: "700", color: "white", fontSize: "30px" }}>HCLTech</p>
              <span style={{ color: "white", fontSize: "35px", fontWeight: "lightest" }}>|</span>
              <p style={{ fontWeight: "400", color: "white", fontSize: "25px" }}>My Travel</p>
            </div>
          </button>
          {!isEmpty(token) && (
            <div className="flex items-center" style={{ flexWrap: "wrap" }}>
              <button
                onClick={getAllStatus}
                className="border border-white-900 px-4 py-2 rounded-lg mr-3 bg-white-500 text-white mb-5 mt-5"
                style={{ margin: "5px" }}
              >
                Approval
              </button>
              <button
                onClick={getAllBooking}
                className="border border-white-900 px-4 py-2 rounded-lg mr-3 bg-white-500 text-white mb-5 mt-5"
                style={{ margin: "5px" }}
              >
                Booking History
              </button>
              <p className="text-white font-bold" style={{ margin: "5px" }}>{currentUser?.user?.role}:</p>
              <p className="text-white" style={{ margin: "5px" }}>{currentUser?.user?.sapId}</p>
              <button
                onClick={openDialog}
                className="hover:pointer h-fit w-fit rounded-full bg-blue p-0.5"
                style={{ margin: "5px" }}
              >
                <Avatar sx={{ bgcolor: "#214f46", border: "2px solid white" }}>
                  {/* {currentUser?.user?.name.charAt(0) || ""} */}
                </Avatar>
              </button>
            </div>
          )}
          <Dialog
            open={isDialogOpen}
            keepMounted
            onClose={closeDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Logout</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are You sure? Do you want to logout ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Close</Button>
              <Button onClick={logout}>Logout</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Header;