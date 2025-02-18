import classNames from "./index.css";
import { connect } from "dva";
import { Icon } from "antd";
import Node from "../Node";
import TreeNode from "../TreeNode";
import Box from "../Box";
import tree from "../../utils/tree";
import { max } from "d3-array";

function Content({ type, handleAddCmp }) {
  const items = [
    { title: "文字", type: "font-size", value: "text" },
    { title: "图片", type: "picture", value: "image" },
    { title: "画布", type: "codepen", value: "canvas" },
    { title: "容器", type: "container", value: "panel" }
  ];

  return (
    <ul className={classNames.list}>
      {items.map(item => (
        <li
          key={item.title}
          className={classNames.line}
          onClick={() => handleAddCmp(item.value, type)}
        >
          <Icon type={item.type} />
          <span className={classNames.title}>{item.title}</span>
        </li>
      ))}
    </ul>
  );
}

export default connect(
  state => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    selectedComponentId: state.slides.selectedComponentId
  }),
  {
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    }),
    deleteCmp: (rootId, id) => ({
      type: "slides/deleteCmp",
      payload: { rootId, id }
    }),
    insertCmp: (id, brother, rootId, before = false) => ({
      type: "slides/insertCmp",
      payload: { id, brother, rootId, before }
    }),
    appendCmp: (id, father, rootId) => ({
      type: "slides/appendCmp",
      payload: { id, father, rootId }
    }),
    handleAddCmp: (type, method) => ({
      type: "slides/createCmp",
      payload: { type, method }
    }),
    showCmpChildren: id => ({
      type: "slides/showCmpChildren",
      payload: { id }
    }),
    hideCmpChildren: id => ({ type: "slides/hideCmpChildren", payload: { id } })
  }
)(function({
  height,
  components,
  selectedId,
  selectedComponentId,
  setSelectedComp,
  deleteCmp,
  insertCmp,
  appendCmp,
  handleAddCmp,
  hideCmpChildren,
  showCmpChildren
}) {
  const nodeWidth = 170;
  const slide = components.find(item => item.id === selectedId);
  const nodes = tree(slide),
    indent = 20;
  const h = max(nodes, node => node.depth);

  const styles = {
    treeNode: node => ({
      marginLeft: node.depth * indent
    }),
    tree: {
      width: nodeWidth + indent * h + 50
    }
  };

  const iconByType = {
    image: <Icon type="picture" />,
    canvas: <Icon type="codepen" />,
    text: <Icon type="font-size" />,
    panel: <Icon type="container" />
  };

  const en2zn = {
    column: "竖直容器",
    row: "水平容器"
  };

  const contentByType = item => {
    const map = {
      image: <img src={item.value} style={{ maxHeight: "2em" }} />,
      canvas: <div>{item.value.slice(0, 15) + "..."}</div>,
      text: <div>{item.value}</div>,
      panel: <div>{en2zn[item.value || "row"]}</div>
    };
    return map[item.type];
  };

  function handleNodeDrop(sourceNodeId, targetNodeId, type) {
    showCmpChildren(sourceNodeId);
    if (sourceNodeId === targetNodeId && type !== "left") return;
    if (sourceNodeId !== targetNodeId && type == "left") return;
    if (type === "top") {
      insertCmp(sourceNodeId, targetNodeId, selectedId, true);
    } else if (type === "middle") {
      const cmp = nodes.find(item => item.id === targetNodeId);
      if (cmp.type !== "panel") {
        alert("只能插入到布局节点到后面～");
        return;
      }
      appendCmp(sourceNodeId, targetNodeId, selectedId);
    } else if (type === "bottom") {
      if (targetNodeId === selectedId) {
        alert("根节点没有兄弟");
        return;
      }
      insertCmp(sourceNodeId, targetNodeId, selectedId);
    }
  }

  return (
    <Box
      height={height}
      title="元素"
      iconType="cluster"
      nodata={nodes.length === 0}
      nodataInfo="没有选择任何幻灯片～"
      name="structure"
      url="https://github.com/pearmini/gossip/blob/master/tutorials.md#%E5%88%B6%E4%BD%9C%E6%AF%8F%E4%B8%80%E5%BC%A0%E5%B9%BB%E7%81%AF%E7%89%87"
    >
      <div style={styles.tree}>
        {nodes.map(item => (
          <TreeNode
            key={item.id}
            node={item}
            onNodeDrop={handleNodeDrop}
            highlightColor="#4091f7"
            style={styles.treeNode(item)}
            width={nodeWidth + "px"}
            hasTop={item.depth !== 0}
            hasBottom={item.depth !== 0}
            canDrag={item.depth !== 0}
            hasRight={item.type === "panel"}
            hasMiddle={item.type === "panel"}
            hasLeft={false}
            onClickRight={() => setSelectedComp(item.id)}
            onClickBottom={() => setSelectedComp(item.id)}
            popoverRight={
              <Content handleAddCmp={handleAddCmp} type="children" />
            }
            popoverBottom={
              <Content handleAddCmp={handleAddCmp} type="brother" />
            }
            onNodeDrag={() => hideCmpChildren(item.id)}
          >
            <Node
              onDelete={() => deleteCmp(selectedId, item.id)}
              highlight={selectedComponentId === item.id}
              height="2em"
              width={nodeWidth}
              nomove={true}
              onAdd={() => setSelectedComp(item.id)}
              hasDelete={item.depth !== 0}
              onClick={() => setSelectedComp(item.id)}
            >
              <div className={classNames.item}>
                <span className={classNames.icon}>{iconByType[item.type]}</span>
                {contentByType(item)}
              </div>
            </Node>
          </TreeNode>
        ))}
      </div>
    </Box>
  );
});
