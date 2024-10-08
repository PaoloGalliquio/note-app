import "./Main.css";
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../hooks/context/authContext";
import { Category } from '../../components/Category/Category';
import { Note } from '../../components/Note/Note';
import { ModalEnabled } from '../../components/modalComponents/ModalEnabled';
import { Create as CreateNote } from '../../modals/Note/Create';
import { Create as CreateCategory } from '../../modals/Category/Create';
import { faCircleNotch, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Edit as EditNote } from '../../modals/Note/Edit';
import { Edit as EditCategory } from '../../modals/Category/Edit';
import { useManageGetRequest } from '../../hooks/useManageGetRequest/useManageGetRequest';
import { getCategoriesByUserIdAPI, getNotesByUserIdAPI, updateNoteAPI } from '../../consumers/backendApisUrls';
import { useManagePutRequest } from '../../hooks/useManagePutRequest/useManagePutRequest';

export const Main = () => {
  const { state } = useContext(AuthContext);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);
  const [modalEnabled, setModalEnabled] = useState({ isEnable: false });
  const [executeGet] = useManageGetRequest();
  const [executePut] = useManagePutRequest();

  useEffect(() => {
    manageSearch();
  }, []);

  const manageSearch = async () => {
    setIsLoading(true);
    await getNotes();
    await getCategories();
    setSelectedCategory({});
    setIsFiltered(false);
    setIsLoading(false);
  }

  async function getNotes() {
    let response = [];
    await executeGet(getNotesByUserIdAPI(state.user.id), ({ data }) => { response = data });
    setNotes(response);
    setActiveNotes(response.filter((note) => !note.archived));
    setArchivedNotes(response.filter((note) => note.archived));
  }

  async function getCategories() {
    await executeGet(getCategoriesByUserIdAPI(state.user.id), ({ data }) => setCategories(data));
  }

  async function onChangeNote(note) {
    await executePut(updateNoteAPI(note.id), note, manageSearch);
    await manageSearch();
  }

  function onClickNote(note){
    setModalEnabled({
      isEnable: true,
      component: EditNote,
      data: { categories: categories, note: note, refreshPage: manageSearch },
    });
  }

  function onUpdateCategory() {
    setModalEnabled({
      isEnable: true,
      component: EditCategory,
      data: { category: selectedCategory, refreshPage: manageSearch },
    });
  }

  function handleOpenCreateNote() {
    setModalEnabled({ 
      isEnable: true, 
      component: CreateNote, 
      data: { categories: categories, refreshPage: manageSearch } 
    });
  }

  function handleOpenCreateCategory() {
    setModalEnabled({
      isEnable: true,
      component: CreateCategory,
      data: { categories: categories, refreshPage: manageSearch },
    });
  }

  function onFilterNotes(categoryId) {
    setIsFiltered(true);
    setSelectedCategory(categories.find((category) => category.id === categoryId));
    const newActiveNotes = notes.filter((note) => note.categoryId === categoryId && !note.archived);
    setActiveNotes(newActiveNotes);
    const newArchivedNotes = notes.filter((note) => note.categoryId === categoryId && note.archived);
    setArchivedNotes(newArchivedNotes);
  }

  function allNotes() {
    setIsFiltered(false);
    setSelectedCategory({});
    const filteredActiveNotes = notes.filter((note) => !note.archived);
    setActiveNotes(filteredActiveNotes);
    const filteredArchivedNotes = notes.filter((note) => note.archived);
    setArchivedNotes(filteredArchivedNotes);
  }

  const additionalButtonsInCategory = (
    <>
      <div className="col-md-1">
        <div
          className="categoryContainer container p-2 h-100"
          onClick={() => {
            allNotes();
          }}>
          <div className="row align-items-center">
            <div className="col">
              <div className="categoryIconContainer">
                <div className="categoryIcon">
                  <FontAwesomeIcon icon={faList} size="lg" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">All categories</div>
          </div>
        </div>
      </div>
      <div className="col-md-1">
        <div className="categoryContainer container p-2 h-100" onClick={handleOpenCreateCategory}>
          <div className="row align-items-center">
            <div className="col">
              <div className="categoryIconContainer">
                <div className="categoryIcon">
                  <FontAwesomeIcon icon={faPlus} size="lg" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">New category</div>
          </div>
        </div>
      </div>
    </>
  );

  const newNote = (
    <div className="d-inline-block ms-3 newNoteCotainer position-relative" onClick={handleOpenCreateNote}>
      <FontAwesomeIcon icon={faPlus} className="newNoteIcon" />
    </div>
  );

  const editCategoryButton = isFiltered && (
    <div className="row mb-3">
      <div className="col-md-auto">
        <div className="noteContainer" onClick={onUpdateCategory}>
          Update note
        </div>
      </div>
    </div>
  );

  if(isLoading){
    return <FontAwesomeIcon icon={faCircleNotch} className="spinner" />;
  }

  return (
    <div>
      <ModalEnabled modalEnabled={modalEnabled} setModalEnabled={setModalEnabled} refreshPage={manageSearch} />
      <div className="row">
        <h1>Categories</h1>
      </div>
      <div className="row py-3 g-3">
        {categories.map((category) => (
          <div className="col-md-auto" key={category.id}>
            <Category category={category} onClickCategory={onFilterNotes} />
          </div>
        ))}
        {additionalButtonsInCategory}
      </div>
      {editCategoryButton}
      <div className="d-flex align-items-center">
        <div className="d-inline-block">
          <h1>Active notes</h1>
        </div>
        {newNote}
      </div>
      <div className="row py-3 g-3">
        {activeNotes.map((note) => (
          <div className="col-md-auto" key={note.id}>
            <Note note={note} onChangeNote={onChangeNote} onClickNote={onClickNote} />
          </div>
        ))}
      </div>
      <div className="row">
        <h1>Archived notes</h1>
      </div>
      <div className="row py-3 g-3">
        {archivedNotes.map((note) => (
          <div className="col-md-auto" key={note.id}>
            <Note note={note} onChangeNote={onChangeNote} onClickNote={onClickNote} />
          </div>
        ))}
      </div>
    </div>
  );
};
