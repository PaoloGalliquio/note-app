import './Category.css'

export const Category = ({ category, onClickCategory }) => {
  return (
    <div
      className="categoryContainer container p-2 h-100"
      onClick={() => {
        onClickCategory(category.id);
      }}>
      <div className="row align-items-center">
        <div className="col">
          <div className="categoryIconContainer">
            <div className="categoryIcon">{category.icon}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">{category.name}</div>
      </div>
      <div className="row categoryCount">
        <div className="col">{category.count}</div>
      </div>
    </div>
  );
};
