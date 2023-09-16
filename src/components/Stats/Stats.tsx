import { createStyles, Progress, Box, Text, Group, Paper, SimpleGrid, rem, Flex } from '@mantine/core';
import { IconArrowDownLeft } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    progressLabel: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        fontSize: theme.fontSizes.sm,
    },

    stat: {
        borderBottom: `${rem(3)} solid`,
        paddingBottom: rem(5),
    },

    statCount: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.3,
    },

    diff: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
}));

interface StatsSegmentsProps {
    grossTotal: string;
    total: string;
    diff: number;
    data: {
        label: string;
        count: string;
        part: number;
        color: string;
    }[];
}

export default function Stat({ grossTotal, total, diff, data }: StatsSegmentsProps) {
    const { classes } = useStyles();

    const segments = data.map((segment) => ({
        value: segment.part,
        color: segment.color,
        label: segment.part > 10 ? `${segment.part}%` : undefined,
    }));

    const descriptions = data.map((stat) => (
        <Box key={stat.label} sx={{ borderBottomColor: stat.color }} className={classes.stat}>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
                {stat.label}
            </Text>

            <Group position="apart" align="flex-end" spacing={0}>
                <Text fw={700}>{stat.count}</Text>
                <Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
                    {stat.part}%
                </Text>
            </Group>
        </Box>
    ));

    return (
        <Paper withBorder p="md" radius="md">
            <Group position="apart">
                <Flex direction={"column"}>
                    <Group spacing={'xl'} mb={10}>
                        <Flex direction={"column"}>
                            <Text fz="xl" fw={700}>
                                {grossTotal}
                            </Text>
                            <Text c="dimmed" fz="sm">
                                Your Gross Income
                            </Text>
                        </Flex>
                    </Group>
                    <Group align="flex-end" spacing="xs">
                        <Text fz="xl" fw={700}>
                            {total}
                        </Text>
                        <Text c="red" className={classes.diff} fz="sm" fw={700}>
                            <span>{diff}%</span>
                            <IconArrowDownLeft size="1rem" style={{ marginBottom: rem(4) }} stroke={1.5} />
                        </Text>
                    </Group>
                </Flex>
            </Group>

            <Text c="dimmed" fz="sm">
                Your Net Income and Estimated Tax Reduction
            </Text>

            <Progress
                sections={segments}
                size={34}
                classNames={{ label: classes.progressLabel }}
                mt={40}
            />
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mt="xl">
                {descriptions}
            </SimpleGrid>
        </Paper>
    );
}
