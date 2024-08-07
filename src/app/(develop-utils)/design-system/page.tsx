import ColorShowcase from './components/_all-text';
import ImageUploaderAndColorPicker from './components/_ImageUploaderAndColorPicker';

export default function ColorsPage() {
  return (
    <div className="container mx-auto mt-4 p-4">
      <ImageUploaderAndColorPicker />
      <hr />
      <ColorShowcase />
    </div>
  );
}
