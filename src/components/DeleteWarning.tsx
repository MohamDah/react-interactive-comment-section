
export default function DeleteWarning({ dFunc, toggleWarning }: { dFunc: any, toggleWarning : any }) {
    function cancel() {
        toggleWarning(null)
    }
    function finishDelete() {
        dFunc()
        toggleWarning(null)
    }

    return (
        <>
            <div className="w-full h-full bg-black opacity-50 fixed z-10 left-0 top-0">
            </div>
            <div className="bg-neutral-white max-w-[450px] w-11/12 md:max-w-none md:w-[450px] opacity-100 fixed z-20 -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 p-6 md:p-9 rounded-xl">
                <h3 className="text-xl md:text-2xl font-medium text-neutral-dark-blue">Delete comment</h3>
                <p className="mt-4 text-base md:text-lg text-neutral-grayish-blue">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="w-full flex text-neutral-white h-12 md:h-14 text-base md:text-lg font-medium gap-4 mt-4">
                    <button onClick={cancel} className="flex-1 bg-neutral-grayish-blue rounded-xl hover:scale-105 transition-transform duration-75 ease-linear">NO, CANCEL</button>
                    <button onClick={finishDelete} className="flex-1 bg-primary-soft-red rounded-xl hover:scale-105 transition-transform duration-75 ease-linear">YES, DELETE</button>
                </div>
            </div>
        </>
    )
}