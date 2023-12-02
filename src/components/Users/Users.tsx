import React, { useEffect } from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from "./UsersSearchForm";
import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFiler,
} from "../../redux/users-selectors";
import { AppDispatch } from "../../redux/redux-store";

type PropsType = {};

export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFiler);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);
  // ЧТОБ НЕ РУГАЛСЯ НА ДИСПАТЧЬ НИЖЕ, В РЕДАКС-СТОР ДОБИВИЛ ТЕМКУ ИЗ КОМЕНТАРИЕВ
  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const _follow = (userId: number) => {
    dispatch(follow(userId));
  };
  const _unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div className={s.users}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((u) => (
        <User
          key={u.id}
          user={u}
          followingInProgress={followingInProgress}
          unfollow={_unfollow}
          follow={_follow}
        />
      ))}
    </div>
  );
};

export default Users;
