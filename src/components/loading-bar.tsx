export function LoadingBar() {
  return (
    <div className="fixed top-16 left-0 right-0 z-50">
      <div className="w-full h-1 bg-muted/20 overflow-hidden">
        <div className="h-full bg-primary animate-[loading_1s_ease-in-out_infinite]" 
             style={{
               width: '40%',
               transformOrigin: 'left',
             }}
        />
      </div>
    </div>
  );
}
