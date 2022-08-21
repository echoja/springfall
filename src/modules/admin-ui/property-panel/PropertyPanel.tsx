import useContentNode from "@common/hooks/use-content-node";
import CodeBlockPropertyPanel from "@modules/content/code-block/property-panel/CodeBlockPropertyPanel";
import CodeLinePropertyPanel from "@modules/content/code-block/property-panel/CodeLinePropertyPanel";
import ImagePropertyPanel from "@modules/content/image/property-panel/ImagePropertyPanel";
import type { Path } from "slate";

const PropertyPanel: React.FC<{ nodePath: Path }> = ({ nodePath: path }) => {
  // Editor 로부터 얻은 node 는 반응성이 없으므로 데이터(atom)으로부터 직접 node를 가져옴
  const node = useContentNode(path);

  // eslint-disable-next-line sonarjs/no-small-switch
  switch (node.type) {
    case "CODE_BLOCK":
      return <CodeBlockPropertyPanel node={node} path={path} />;
    case "CODE_LINE":
      return <CodeLinePropertyPanel node={node} path={path} />;
    case "IMAGE":
      return <ImagePropertyPanel node={node} path={path} />;
    default:
      return null;
  }
};

export default PropertyPanel;
