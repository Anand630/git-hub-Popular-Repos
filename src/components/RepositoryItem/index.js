import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails
  return (
    <li className="repository-item-card-container">
      <img className="card-item-avatar" src={avatarUrl} alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="icon-and-data-container">
        <img
          className="small-count-icons"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stars-count-data">{starsCount} stars</p>
      </div>
      <div className="icon-and-data-container">
        <img
          className="small-count-icons"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stars-count-data">{forksCount} stars</p>
      </div>
      <div className="icon-and-data-container">
        <img
          className="small-count-icons"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stars-count-data">{issuesCount} stars</p>
      </div>
    </li>
  )
}

export default RepositoryItem
