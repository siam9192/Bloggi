const ManageBlogTableCardLoading = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 w-10 bg-gray-300 rounded"></div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 flex flex-col gap-2 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[400px] text-wrap"
      >
        <div className="h-52 w-[300px] bg-gray-300 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-300 w-full rounded"></div>
          <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
        </div>
      </th>
      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
      </td>
      <td className="px-6 py-4 space-y-2">
        <div className="h-4 w-36 bg-gray-300 rounded"></div>
        <div className="h-4 w-36 bg-gray-300 rounded"></div>
        <div className="h-4 w-36 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-4 space-y-2">
        <div className="h-10 w-10 bg-gray-300 rounded-full mx-auto"></div>
        <div className="h-4 w-24 bg-gray-300 rounded mx-auto"></div>
      </td>
      <td className="px-6 py-4 flex items-center gap-2">
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
};

export default ManageBlogTableCardLoading;
