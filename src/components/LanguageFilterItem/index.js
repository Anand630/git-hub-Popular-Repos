import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, updateLanguageForFiltering, isButtonClicked} = props
  const {id, language} = languageItem

  const buttonClassName = isButtonClicked
    ? 'language-type-menu-button-on'
    : 'language-type-menu-button-off'

  const onFilterMenuOptionClick = () => {
    updateLanguageForFiltering(id)
  }

  return (
    <li>
      <button
        onClick={onFilterMenuOptionClick}
        type="button"
        className={buttonClassName}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
