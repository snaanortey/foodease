import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';

export interface IRecipeItem {
  id: string;
  title: string;
  imageUrl: string;
}

const RecipeItem: React.FC<IRecipeItem> = ({ title, imageUrl }) => {
  return (
    <Link className="m-2 w-30 h-30" href="">
      <Card className="">
        <CardHeader floated={false} className="">
          <Image src={imageUrl} alt="recipe picture" width={80} height={80} />
        </CardHeader>
        <CardBody className="text-center h-4">
          <Typography variant="h8" color="blue-gray" className="mb-2 text-xs">
            {title}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
};

export default RecipeItem;
