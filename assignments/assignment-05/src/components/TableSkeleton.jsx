const TableSkeleton = ({ rows = 10, cols = 6 }) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <td key={colIndex}>
                            <div
                                className='placeholder-glow'
                                style={{ width: '100%' }}
                            >
                                <span
                                    className='placeholder col-12 rounded'
                                    style={{ height: '1rem', display: 'block' }}
                                ></span>
                            </div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableSkeleton;
