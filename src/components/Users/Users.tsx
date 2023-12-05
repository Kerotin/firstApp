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
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

type PropsType = {};
type QueryParamsType = {
  term?: string;
  page?: string;
  friend?: string;
};
export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFiler);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatch = useDispatch();
  const history = useNavigate();
  const { search } = useLocation();

  useEffect(
    () => {
      debugger;
      const parsed = queryString.parse(search) as QueryParamsType;

      let actualPage = currentPage;
      let actualFilter = filter;
      if (!!parsed.page) actualPage = Number(parsed.page);
      if (!!parsed.term)
        actualFilter = { ...actualFilter, term: parsed.term as string };
      switch (parsed.friend) {
        case "null":
          actualFilter = { ...actualFilter, friend: null };
          break;
        case "true":
          actualFilter = { ...actualFilter, friend: true };
          break;
        case "false":
          actualFilter = { ...actualFilter, friend: false };
          break;
      }

      dispatch(requestUsers(actualPage, pageSize, actualFilter));
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    const query: QueryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);
    history({
      pathname: "/users",
      // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
      search: queryString.stringify(query),
    });
  }, [currentPage, filter.friend, filter.term, history]);

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
