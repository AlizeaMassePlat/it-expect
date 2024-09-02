import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { changeValuePost } from '../../actions';

/**
 * Custom InputCreatePost component
 * @component
 * @example
 * const name = email
 * const props = {
 *  className: "input__class",
 *  placeholder: "your placeholder"
 * }
 * return (
 *  <Input
 *    name={name}
 *    className={className}
 *    placeholder={placeholder}
 *    value=""
 *    onChange={handleChange}
 *  />
 * )
 */
function InputCreatePost({ name, ...props }) {
  const value = useSelector((state) => state.postCreation[name]);
  const dispatch = useDispatch();
  const handleChange = (event) => dispatch(changeValuePost(event.target.value, name));

  return (
    <input
      name={name}
      value={value || ''}
      onChange={handleChange}
      {...props}
    />
  );
}

InputCreatePost.propTypes = {
  name: PropTypes.string.isRequired,
};

export default InputCreatePost;
