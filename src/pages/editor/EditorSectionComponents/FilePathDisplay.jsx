import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, {Fragment} from "react";

function FilePathDisplay({ path }) {
  return (
      <Breadcrumb className="px-4 py-1 bg-editor">
        <BreadcrumbList>
        {/* split link based on / */}
          {path.split("/").map((part, i, row) => (
            <Fragment key={i}>
              {/* 
                make a text for this path section
                if it is the last one make the color close to white
              */}
              <BreadcrumbItem className={`${i + 1 == row.length && 'text-neutral-300'}`}>{part}</BreadcrumbItem>

                {/* 
                  Make a seprarator after each path section
                  if it is not the last
                */}
              {i + 1 != row.length && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
  );
}

export default FilePathDisplay;
