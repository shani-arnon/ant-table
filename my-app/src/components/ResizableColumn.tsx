import { Resizable, ResizableProps } from "react-resizable";
import 'react-resizable/css/styles.css'

const ResizableColumn = ({ 
    onResize, 
    onResizeStop, 
    onResizeStart, 
    width, 
    ...restProps 
}: ResizableProps) => {
  
    if (!width) {
      return <th {...restProps} />
    }
  
    return (
      <Resizable
       width={width}
       height={0}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop= {onResizeStop}
         >
        <th
        key='a'
        {...restProps} />
      </Resizable>
    )
};
export default ResizableColumn;