"use client";

function plusMinusDisplayText(operation) {
  if (operation.insert && operation.del) {
    return (
      <div>
        <span className="bg-[#FFC9CB]">-1</span> |{" "}
        <span className="bg-[#C0D8EF]">+1</span>
      </div>
    );
  } else if (operation.insert) {
    return (
      <div>
        <span className="bg-[#C0D8EF]">+1</span>
      </div>
    );
  } else {
    return (
      <div>
        <span className="bg-[#FFC9CB]">-1</span>
      </div>
    );
  }
}

export default function TextChanges({ operations }) {
  console.log("Rendering TextChanges");

  return (
    <div>
      {operations.forEach((value, key) => {
        {
          console.log(key, value);
        }
        <div
          key={key}
          className="p-3 border border-gray-400 border-1 rounded mx-auto mb-2 w-11/12"
        >
          <div className="flex justify-between">
            <div className="text-gray-400 text-sm font-semibold uppercase">
              {value.insert && value.del
                ? "replaced"
                : value.insert
                ? "inserted"
                : "deleted"}
            </div>
            {plusMinusDisplayText(value)}
          </div>
          <div>
            <p>
              <span className="bg-[#FFC9CB]">{value.deleteText}</span>
            </p>
            <p>
              <span className="bg-[#C0D8EF]">{value.insertText}</span>
            </p>
          </div>
        </div>;
      })}
    </div>
  );
}
