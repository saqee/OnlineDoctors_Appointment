import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { showLoading, hideLoading } from "../redux/features/alertSlice"
import { getUser } from "../redux/features/userSlice.js"
import axios from "axios"
export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const getUserCall = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.get("/api/v1/user/getuserdata", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      dispatch(hideLoading())
      if (res.data.success) {
        dispatch(getUser(res.data.data))
      } else {
        return <Navigate to="/login" />
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!user) {
      getUserCall()
    }
  }, [user, getUserCall])
  if (localStorage.getItem("token")) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}
