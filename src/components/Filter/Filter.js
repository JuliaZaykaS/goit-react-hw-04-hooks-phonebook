import PropTypes from "prop-types";
import s from './Filter.module.css';

export default function Filter({ filter, onFindName }) {
  return (
    <>
      <h3>Find contact by name</h3>
      <input className={s.filterInput} type="text" name="filter" value={filter} onChange={onFindName}></input>
    </>
  );
}

Filter.propTypes = {
    filter: PropTypes.string,
}
