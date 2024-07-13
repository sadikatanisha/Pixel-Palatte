import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <CardHeader className="h-[1000px]">
          <Skeleton />
        </CardHeader>
      </Card>
    </div>
  );
};

export default loading;
