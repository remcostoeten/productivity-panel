import {
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
} from '@c/ui';

type GeneralSettingsSkeletonProps = {
    variant?: 'default' | 'letter';
};

const SkeletonShimmer = ({ width, height }: { width: string; height: string }) => (
    <div className={`relative overflow-hidden ${width} ${height} bg-dark-section--lighter rounded`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dark-section--lighter to-transparent animate-shimmer"></div>
    </div>
);

const SkeletonText = ({ width }: { width: string }) => (
    <SkeletonShimmer width={width} height="h-4" />
);

const GeneralSettingsSkeleton: React.FC<GeneralSettingsSkeletonProps> = ({ variant = 'default' }) => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold mb-2">Preferred Email</h2>
                {variant === 'default' ? (
                    <SkeletonShimmer width="w-full" height="h-10" />
                ) : (
                    <div className="relative">
                        <Input disabled />
                        <div className="absolute inset-y-0 left-3 right-3 flex items-center">
                            <SkeletonText width="w-3/4" />
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Animated Logo</h2>
                <p className="text-sm text-muted mb-4">
                    The animated logo is displayed when navigating to a new page. You can
                    choose to enable or disable this animation.
                </p>
                <div className="flex items-center justify-between">
                    <Label htmlFor="show-preloader" className="text-sm font-medium">
                        Show animated logo on page load
                    </Label>
                    {variant === 'default' ? (
                        <SkeletonShimmer width="w-11" height="h-6" />
                    ) : (
                        <Switch id="show-preloader" />
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Moments</h2>
                {variant === 'default' ? (
                    <SkeletonShimmer width="w-full" height="h-10 mb-2" />
                ) : (
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue>
                                <SkeletonText width="w-1/2" />
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">default browser</SelectItem>
                            <SelectItem value="chrome">Chrome</SelectItem>
                            <SelectItem value="firefox">Firefox</SelectItem>
                        </SelectContent>
                    </Select>
                )}
                <p className="text-sm text-muted mt-2">
                    Not all mail apps support deep linking to a specific message, so Clay
                    will open emails and events from Moments in your browser by default.{" "}
                    <a href="#" className="text-primary">
                        Learn more about email settings.
                    </a>
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                <div className="flex items-start justify-between">
                    <div className="text-sm text-muted pr-4">
                        <p className="mb-2">Allow us to send you notifications for:</p>
                        <ul className="list-disc list-inside">
                            <li>Important updates or changes to your account</li>
                            <li>Personal schedule updates</li>
                        </ul>
                    </div>
                    {variant === 'default' ? (
                        <SkeletonShimmer width="w-11" height="h-6" />
                    ) : (
                        <Switch id="allow-notifications" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeneralSettingsSkeleton;
