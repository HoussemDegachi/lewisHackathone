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
          {path.split("/").map((part, i, row) => (
            <Fragment key={i}>
              <BreadcrumbItem className={`${i + 1 == row.length && 'text-neutral-300'}`}>{part}</BreadcrumbItem>

              {i + 1 != row.length && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
  );
}

export default FilePathDisplay;
