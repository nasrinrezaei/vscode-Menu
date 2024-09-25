import clsx from "clsx";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useRef, memo, useMemo, useState } from "react";
import classes from "./index.module.scss";

function App() {
  const [menuItems, setMenuItems] = useState([
    {
      fileName: "root",
      id: `${Math.random()}/${Math.random()}`,
      type: "folder",
      isExpand: true,
      children: [
        {
          fileName: "src",
          id: `${Math.random()}/${Math.random()}`,
          type: "folder",
          isExpand: false,
          children: [
            {
              fileName: "src new folder",
              id: `${Math.random()}/${Math.random()}`,
              type: "folder",
              isExpand: false,
              children: [
                {
                  fileName: "src new folder/folder",
                  id: `${Math.random()}/${Math.random()}`,
                  type: "folder",
                  children: [],
                  isExpand: false,
                },
              ],
            },
          ],
        },
        {
          fileName: "package",
          id: `${Math.random()}/${Math.random()}`,
          type: "file",
          children: [],
        },
      ],
    },
  ]);
  const [selectedItem, setSelectedItem] = useState();

  const addFile = (arr, id) => {
    const tgtObj = arr.find((item) => item.id === id);
    if (tgtObj) {
      tgtObj.children = [
        ...tgtObj.children,
        {
          fileName: "new file",
          id: `${Math.random()}/${Math.random()}`,
          type: "file",
          children: [],
        },
      ];
    } else {
      arr
        .filter((el) => "children" in el)
        .forEach(({ children }) => addFile(children, id));
    }
    return arr;
  };
  const changeCollapse = (arr, id) => {
    const tgtObj = arr.find((item) => item.id === id);
    if (tgtObj) {
      tgtObj.isExpand = !tgtObj.isExpand;
    } else {
      arr
        .filter((el) => "children" in el)
        .forEach(({ children }) => changeCollapse(children, id));
    }
    return arr;
  };
  const selectMenuItem = (e, item) => {
    e.stopPropagation();

    setSelectedItem((prev) => item);
  };
  const changeMenuStructure = (data, selected) => {
    const result = addFile(data, selected?.id);
    setMenuItems((prev) => [...result]);
    setSelectedItem();
  };
  const changeCollapseStructure = (e, data, selected) => {
    e.stopPropagation();
    const result = changeCollapse(data, selected?.id);
    setMenuItems((prev) => [...result]);
  };
  const MenuItem = (subMenu) => {
    return subMenu?.map((item) => (
      <div className={classes["main-page__menu-item-parent"]} key={item.id}>
        <div className={clsx([classes["main-page__menu-item-name"]])}>
          {item.type === "folder" && (
            <div onClick={(e) => changeCollapseStructure(e, menuItems, item)}>
              {item.isExpand ? 1 : 2}
            </div>
          )}
          <div onClick={(e) => selectMenuItem(e, item)}>{item.fileName}</div>
        </div>
        <div>
          <div
            className={clsx([
              {
                [classes[`main-page__menu-item-name--expand`]]: item.isExpand,
              },
              {
                [classes[`main-page__menu-item-name--collapse`]]:
                  !item.isExpand,
              },
            ])}
          >
            {item?.children?.map((_item) => (
              <div className={classes["main-page__menu-item"]} key={_item.id}>
                <div className={classes["main-page__menu-item-name"]}>
                  {_item.type === "folder" && (
                    <div
                      onClick={(e) =>
                        changeCollapseStructure(e, menuItems, _item)
                      }
                    >
                      {_item.isExpand ? 1 : 2}
                    </div>
                  )}
                  <div onClick={(e) => selectMenuItem(e, _item)}>
                    {_item.fileName}
                  </div>
                </div>
                <div
                  className={clsx([
                    {
                      [classes[`main-page__menu-item-name--expand`]]:
                        _item.isExpand,
                    },
                    {
                      [classes[`main-page__menu-item-name--collapse`]]:
                        !_item.isExpand,
                    },
                  ])}
                >
                  {!!_item?.children?.length && MenuItem(_item.children)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <div className={classes["main-page"]}>
        <div className={classes["main-page__menu"]}>
          <div className={classes["main-page__menu-options"]}>
            <div onClick={() => changeMenuStructure(menuItems, selectedItem)}>
              add folder
            </div>
          </div>
          {MenuItem(menuItems)}
        </div>
      </div>
    </div>
  );
}

export default App;
