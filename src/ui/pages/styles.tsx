import { useState } from "react";

import { OperationStatus } from "@app/types";

import {
  AppHeader,
  DatabaseHeader,
  EnvHeader,
  OpHeader,
  StackHeader,
} from "../layouts";
import {
  AptibleLogo,
  Banner,
  Breadcrumbs,
  Button,
  ButtonIcon,
  ButtonLink,
  FormGroup,
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight,
  IconBox,
  IconCheck,
  IconCheckCircle,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconCloud,
  IconCopy,
  IconCreditCard,
  IconCylinder,
  IconDownload,
  IconEdit2,
  IconEllipsis,
  IconExternalLink,
  IconGitBranch,
  IconGlobe,
  IconHamburger,
  IconHeart,
  IconInfo,
  IconLayers,
  IconLogout,
  IconPlusCircle,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconThumbsUp,
  IconTrash,
  IconX,
  IconXCircle,
  Input,
  InputSearch,
  LogLine,
  OrgPicker,
  Pill,
  Secret,
  Select,
  SelectOption,
  StatusPill,
  TableHead,
  Tabs,
  Td,
  Tooltip,
  pillStyles,
  tokens,
} from "../shared";
import {
  defaultDeployApp,
  defaultDeployDatabase,
  defaultDeployEndpoint,
  defaultDeployEnvironment,
  defaultDeployOperation,
  defaultDeployService,
  defaultDeployStack,
} from "@app/deploy";
import { defaultDeployDisk } from "@app/deploy/disk";
import { defaultDeployImage } from "@app/deploy/image";

const StylesWrapper = ({
  children,
  navigation,
}: { children: React.ReactNode; navigation: React.ReactNode }) => (
  <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
    <div className="flex">
      <div className="pb-4 fixed">{navigation}</div>
      <div className="ml-40 pb-4 overflow-y-auto w-full mr-2 flex flex-col gap-6">
        {children}
      </div>
    </div>
  </div>
);

const StylesNavigation = () => (
  <nav className="mt-2 flex-1 px-2 bg-white space-y-1">
    <div className="mb-4">
      <AptibleLogo />
    </div>
    {[
      { name: "Colors", to: "#colors" },
      { name: "Typography", to: "#typography" },
      { name: "Buttons", to: "#buttons" },
      { name: "Banners", to: "#banners" },
      { name: "Tables", to: "#tables" },
      { name: "Forms", to: "#forms" },
      { name: "Logs", to: "#logs" },
      { name: "Pills", to: "#pills" },
      { name: "Navigation", to: "#navigation" },
      { name: "Icons", to: "#icons" },
      { name: "Info", to: "#info" },
      { name: "Detail Boxes", to: "#detail-boxes" },
    ].map(({ name, to }) => (
      <a className={tokens.type["table link"]} href={to} key={to}>
        <div className="flex items-center">
          <div>{name}</div>
        </div>
      </a>
    ))}
  </nav>
);

const Banners = () => (
  <div className="pt-16 space-y-4">
    <h1 id="banners" className={tokens.type.h1}>
      Banners
    </h1>
    <Banner className="mt-2" variant="default">
      Default banner
    </Banner>
    <Banner className="mt-2" variant="success">
      Success banner
    </Banner>
    <Banner className="mt-2" variant="progress">
      Progress banner
    </Banner>
    <Banner className="mt-2" variant="info">
      Info banner
    </Banner>
    <Banner className="mt-2" variant="warning">
      Warning banner
    </Banner>
    <Banner className="mt-2" variant="error">
      Error banner
    </Banner>
  </div>
);

const Tables = () => (
  <div className="pt-16 space-y-4">
    <h1 id="tables" className={tokens.type.h1}>
      Tables
    </h1>
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg my-4 mx-4">
      <table className="min-w-full divide-y divide-gray-300">
        <TableHead
          headers={Array(8)
            .fill(0)
            .map((_, idx) => `Header ${idx + 1}`)}
        />
        <tbody className="divide-y divide-gray-200 bg-white">
          {Array(5)
            .fill(0)
            .map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array(8)
                  .fill(0)
                  .map((_, colIdx) => (
                    <Td key={colIdx}>{`Cell - ${colIdx + 1} x ${
                      rowIdx + 1
                    }`}</Td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Forms = () => {
  const [search, setSearch] = useState("");
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(ev.currentTarget.value);

  const [choice, setChoice] = useState<string>("");
  const [formInput, setFormInput] = useState("");
  const selectOption = (option: SelectOption) => {
    setChoice(option.value);
  };
  const options: SelectOption[] = Array(8)
    .fill(0)
    .map((_, idx) => ({
      label: `Select Menu Option ${idx + 1}`,
      value: `option_${idx + 1}`,
    }));
  const selectedOption = [].find(
    (option: SelectOption) => option.value === choice,
  );

  return (
    <div className="pt-16 space-y-4">
      <h1 id="forms" className={tokens.type.h1}>
        Forms
      </h1>
      <InputSearch
        className="mt-4"
        placeholder="Search field..."
        search={search}
        onChange={onChange}
      />
      <Input
        className="mt-4"
        name="app-handle"
        type="text"
        value={formInput}
        onChange={(e) => setFormInput(e.currentTarget.value)}
        autoComplete="name"
        data-testid="input-name"
        id="input-name"
        placeholder="Input"
      />
      <Input
        className="mt-4"
        name="app-handle"
        type="text"
        value={formInput}
        onChange={(e) => setFormInput(e.currentTarget.value)}
        disabled
        autoComplete="name"
        data-testid="input-name"
        id="input-name"
        placeholder="Disabled input"
      />
      <Select
        className="mt-4"
        onSelect={selectOption}
        value={selectedOption}
        options={options}
      />
      <p className="mt-4">
        <input type="radio" key="service" value="radio" defaultChecked /> Radio
        checked
      </p>
      <p className="mt-4">
        <input type="radio" key="service" value="radio" /> Radio unchecked
      </p>
      <p className="mt-4">
        <input type="radio" key="service" value="radio" disabled /> Radio
        disabled
      </p>
      <textarea
        className={`${tokens.type.textarea} mt-4`}
        defaultValue="Editable textarea"
      />

      <h3 className={tokens.type.h3}>Form Groups</h3>

      <FormGroup htmlFor="input - name" label="Input (label)">
        <Input
          name="app-handle"
          type="text"
          value={formInput}
          onChange={(e) => setFormInput(e.currentTarget.value)}
          autoComplete="name"
          data-testid="input-name"
          id="input-name"
          placeholder="Input"
        />
      </FormGroup>
    </div>
  );
};

const Colors = () => (
  <div className="pt-12 space-y-4">
    <h1 id="colors" className={tokens.type.h1}>
      Colors
    </h1>

    <h3 className={tokens.type.h3}>Main Colors</h3>
    <div className="flex my-2">
      <div className="rounded-full bg-black w-8 h-8 block mr-2" />
      <p className="leading-8">Black</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-white border-solid border border-black w-8 h-8 block mr-2" />
      <p className="leading-8">White</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-indigo w-8 h-8 block mr-2" />
      <p className="leading-8">Indigo</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-yellow w-8 h-8 block mr-2" />
      <p className="leading-8">Yellow (Sunset)</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-gold w-8 h-8 block mr-2" />
      <p className="leading-8">Gold</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-forest w-8 h-8 block mr-2" />
      <p className="leading-8">Forest</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-red w-8 h-8 block mr-2" />
      <p className="leading-8">Red</p>
    </div>
    <h3 className={tokens.type.h3}>Misc. Colors</h3>
    <div className="flex my-2">
      <div className="rounded-full bg-off-white border-solid border border-black w-8 h-8 block mr-2" />
      <p className="leading-8">Off-White</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-lime w-8 h-8 block mr-2" />
      <p className="leading-8">Lime</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-cyan w-8 h-8 block mr-2" />
      <p className="leading-8">Cyan</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-brown w-8 h-8 block mr-2" />
      <p className="leading-8">Brown</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-lavender w-8 h-8 block mr-2" />
      <p className="leading-8">Lavender</p>
    </div>
    <div className="flex my-2">
      <div className="rounded-full bg-plum w-8 h-8 block mr-2" />
      <p className="leading-8">Plum</p>
    </div>
  </div>
);

const Typography = () => (
  <div className="pt-16 space-y-4">
    <h1 id="typography" className={tokens.type.h1}>
      Typography
    </h1>

    <h1 className={tokens.type.h1}>H1 Heading</h1>
    <h2 className={tokens.type.h2}>H2 Heading</h2>
    <h3 className={tokens.type.h3}>H3 Heading</h3>
    <h4 className={tokens.type.h4}>H4 Heading</h4>
    <p>Paragraph text</p>

    <p>
      <a href="/">Link Text (Unstyled)</a>
    </p>
    <p>
      <a className={tokens.type.link} href="/">
        Link Text (Styled as tokens.type.link)
      </a>
    </p>

    <p>Paragraph variants</p>
    <p className={tokens.type["small semibold darker"]}>
      Small semibold darker
    </p>
    <p className={tokens.type["small normal darker"]}>Small normal darker</p>
    <p className={tokens.type["small normal lighter"]}>Small normal lighter</p>
    <p className={tokens.type["medium label"]}>Medium label</p>

    <p className={tokens.type.textarea}>Textarea format</p>

    <p className={tokens.type.pre}>Preformatted code</p>
  </div>
);

const Buttons = () => (
  <div className="pt-16 space-y-4">
    <h1 id="buttons" className={tokens.type.h1}>
      Buttons
    </h1>

    <h3 className={tokens.type.h3}>Button Variants</h3>
    <Button className="mt-2">Button Default</Button>
    <Button className="mt-2" variant="primary">
      Primary Button
    </Button>
    <Button className="mt-2" variant="delete">
      Delete Button
    </Button>
    <Button className="mt-2" variant="secondary">
      Secondary Button
    </Button>
    <Button className="mt-2" variant="success">
      Success Button
    </Button>
    <Button className="mt-2" variant="white">
      White Button
    </Button>

    <ButtonIcon icon={<IconPlusCircle />}>Button Icon</ButtonIcon>

    <ButtonLink to="#">Button Link</ButtonLink>

    <h3 className={tokens.type.h3}>Button Sizes</h3>
    <Button className="mt-2" size="xs">
      Extra Small
    </Button>
    <Button className="mt-2" size="sm">
      Small
    </Button>
    <Button className="mt-2" size="md">
      Medium
    </Button>
    <Button className="mt-2" size="lg">
      Large
    </Button>
    <Button className="mt-2" size="xl">
      Extra Large
    </Button>

    <h3 className={tokens.type.h3}>Button States</h3>
    <Button className="mt-2" disabled>
      Button Disabled
    </Button>
    <Button className="mt-2" isLoading />
  </div>
);

const Logs = () => (
  <div className="pt-16 space-y-4">
    <h1 id="logs" className={tokens.type.h1}>
      Logs
    </h1>
    <div className="mt-4 font-mono bg-black p-2 rounded-lg text-black-200">
      {"2023-06-14 16:45:39 +0000 INFO -- : Starting Database backup operation with ID: 3946\n2023-06-14 16:45:39 +0000 INFO -- : STARTING: Snapshot EBS volume\n        2023-06-14 16:45:40 +0000 INFO -- : WAITING FOR: Snapshot EBS volume\n        2023-06-14 16:45:52 +0000 INFO -- : WAITING FOR: Snapshot EBS volume\n        2023-06-14 16:46:04 +0000 INFO -- : WAITING FOR: Snapshot EBS volume\n        2023-06-14 16:46:16 +0000 INFO -- : WAITING FOR: Snapshot EBS volume\n        2023-06-14 16:46:29 +0000 INFO -- : WAITING FOR: Snapshot EBS volume\n        2023-06-14 16:46:41 +0000 INFO -- : WAITING FOR: Snapshot EBS volume\n        2023-06-14 16:46:45 +0000 INFO -- : COMPLETED (after 65.95s): Snapshot EBS volume\n        2023-06-14 16:46:45 +0000 INFO -- : STARTING: Commit Backup in API\n        2023-06-14 16:46:46 +0000 INFO -- : COMPLETED (after 0.2s): Commit Backup in API\n"
        .split("\n")
        .map((line, i) => {
          return <LogLine key={`log-${i}`} text={line} />;
        })}
    </div>
  </div>
);

const operationStatuses: OperationStatus[] = [
  "queued",
  "failed",
  "running",
  "succeeded",
  "unknown",
];
const Pills = () => (
  <div className="pt-16 space-y-4">
    <h1 id="pills" className={tokens.type.h1}>
      Pills
    </h1>
    <div className="mt-4">
      <h3 className={tokens.type.h3}>Customizable pill with icon</h3>
      <div className="mt-4">
        <Pill icon={<IconGitBranch variant="sm" />} key="test">
          Basic Icon With Pill
        </Pill>
      </div>
      <div className="mt-4">
        <Pill className={pillStyles.error}>Error Pill</Pill>
      </div>
      <div className="mt-4">
        <Pill className={pillStyles.pending}>Pending Pill</Pill>
      </div>
      <div className="mt-4">
        <Pill className={pillStyles.progress}>Progress Pill</Pill>
      </div>
      <div className="mt-4">
        <Pill className={pillStyles.success}>Success Pill</Pill>
      </div>
    </div>
    <div className="mt-4">
      <h3 className={tokens.type.h3}>Operation status and time-based pill</h3>
      {operationStatuses.map((status) => (
        <div className="mt-4" key={status}>
          <StatusPill from={new Date().toString()} status={status} />
        </div>
      ))}
    </div>
  </div>
);

const Navigation = () => (
  <div className="pt-16 space-y-4">
    <h1 id="navigation" className={tokens.type.h1}>
      Navigation
    </h1>
    <div className="mt-4">
      <h3 className={tokens.type.h3}>Tabs</h3>
      <div className="mt-4">
        <Tabs
          tabs={[
            { name: "Tab 1", current: true, href: "#" },
            { name: "Tab 2", current: false, href: "/" },
            { name: "Tab 3", current: false, href: "/" },
            { name: "Tab 4", current: false, href: "/" },
            { name: "Tab 5", current: false, href: "/" },
            { name: "Tab 6", current: false, href: "/" },
          ]}
        />
      </div>
    </div>
    <div className="mt-4">
      <h3 className={tokens.type.h3}>Breadcrumbs</h3>
      <div className="mt-4">
        <Breadcrumbs
          crumbs={[
            { to: "/", name: "Crumb 1" },
            { to: "/", name: "Crumb 2" },
            { to: "/", name: "Crumb 3" },
            { to: "/", name: "Crumb 4" },
            { to: "/styles", name: "Crumb 5" },
          ]}
        />
      </div>
    </div>
  </div>
);

const Icons = () => (
  <div className="pt-16 space-y-4">
    <h1 id="icons" className={tokens.type.h1}>
      Icons
    </h1>
    <div className="mt-4 space-y-4">
      {[
        ["IconArrowRight", <IconArrowRight />],
        ["IconArrowLeft", <IconArrowLeft />],
        ["IconEdit2", <IconEdit2 />],
        ["IconChevronUp", <IconChevronUp />],
        ["IconChevronRight", <IconChevronRight />],
        ["IconChevronDown", <IconChevronDown />],
        ["IconCylinder", <IconCylinder />],
        ["IconTrash", <IconTrash />],
        ["IconBox", <IconBox />],
        ["IconSettings", <IconSettings />],
        ["IconSearch", <IconSearch />],
        ["IconCheck", <IconCheck />],
        ["IconCheckCircle", <IconCheckCircle />],
        ["IconPlusCircle", <IconPlusCircle />],
        ["IconX", <IconX />],
        ["IconXCircle", <IconXCircle />],
        ["IconAlertTriangle", <IconAlertTriangle />],
        ["IconLayers", <IconLayers />],
        ["IconLogout", <IconLogout />],
        ["IconGitBranch", <IconGitBranch />],
        ["IconInfo", <IconInfo />],
        ["IconCreditCard", <IconCreditCard />],
        ["IconGlobe", <IconGlobe />],
        ["IconEllipsis", <IconEllipsis />],
        ["IconExternalLink", <IconExternalLink />],
        ["IconCopy", <IconCopy />],
        ["IconDownload", <IconDownload />],
        ["IconThumbsUp", <IconThumbsUp />],
        ["IconRefresh", <IconRefresh />],
        ["IconHeart", <IconHeart />],
        ["IconCloud", <IconCloud />],
        ["IconHamburger", <IconHamburger />],
      ].map(([title, icon]) => (
        <div key={title as string}>
          <div className="inline-block -mb-1">{icon}</div>{" "}
          <span>
            <pre className="inline">{title}</pre>
          </span>
        </div>
      ))}
    </div>
  </div>
);

const Info = () => (
  <div className="pt-16 space-y-4">
    <h1 id="info" className={tokens.type.h1}>
      Info
    </h1>
    <OrgPicker />
    <Tooltip text="Here is some help text!">
      <div>Here is a tooltip hover top</div>
    </Tooltip>
    <Tooltip text="Here is some help text! Here is some help text! Here is some help text! Here is some help text! Here is some help text!">
      <div>Here is a tooltip hover top long</div>
    </Tooltip>
  </div>
);

const DetailBoxes = () => {
  const appId = "222";
  const op = defaultDeployOperation({
    createdAt: new Date("2023-06-25").toISOString(),
    userName: "Aptible Bot",
    type: "deploy",
    resourceType: "app",
    resourceId: appId,
    status: "succeeded",
  });
  const app = defaultDeployApp({
    id: appId,
    handle: "My App",
    gitRepo: "some.git@repo.com",
    lastDeployOperation: op,
    currentImage: defaultDeployImage({ dockerRepo: "some.docker.repo" }),
  });

  const db = defaultDeployDatabase({
    type: "postgresql",
    disk: defaultDeployDisk({
      provisionedIops: 1000,
      size: 100,
      ebsVolumeType: "idk",
      keyBytes: 32,
    }),
  });
  const service = defaultDeployService({
    instanceClass: "m4",
    containerMemoryLimitMb: 4096,
  });
  const stack = defaultDeployStack({
    name: "Primary stack",
    organizationId: "123",
    region: "us-east-1",
    outboundIpAddresses: ["192.168.1.1", "192.168.1.2", "192.168.1.3"],
  });
  const env = defaultDeployEnvironment({
    id: "123",
    stackId: stack.id,
    appContainerCount: 4,
    databaseContainerCount: 10,
    totalAppCount: 4,
    totalDatabaseCount: 10,
    totalBackupSize: 1024,
  });
  const ept = defaultDeployEndpoint({
    id: "333",
    virtualDomain: "https://something.great",
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 id="detail-boxes" className={tokens.type.h1}>
        Detail Boxes
      </h1>

      <StackHeader stack={stack} />
      <EnvHeader
        stack={stack}
        environment={env}
        latestOperation={op}
        endpoints={[ept]}
      />
      <AppHeader app={app} />
      <DatabaseHeader database={db} service={service} />
      <OpHeader op={op} resourceHandle={app.handle} />
    </div>
  );
};

const Secrets = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 id="detail-boxes" className={tokens.type.h1}>
        Secrets
      </h1>
      <Secret secret="secret-value-showing-by-default" showAsOpened />
      <Secret secret="secret-value-hidden-by-default" />
    </div>
  );
};

export const StylesPage = () => (
  <div className="px-4 py-4">
    <StylesWrapper navigation={<StylesNavigation />}>
      <Colors />
      <Typography />
      <Buttons />
      <Banners />
      <Tables />
      <Forms />
      <Logs />
      <Pills />
      <Navigation />
      <Icons />
      <Info />
      <DetailBoxes />
      <Secrets />
    </StylesWrapper>
  </div>
);